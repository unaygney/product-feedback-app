'use client'

import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ArrowLeft, ChevronUp, GripVertical, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

import { getStatusColor, getTypeBg } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

import { useProduct } from '@/hooks'
import {
  useDownvoteMutation,
  useUpdateSuggestionStatus,
  useUpvoteMutation,
  useVoteStatus,
} from '@/hooks'

interface KanbanItem {
  id: string
  title: string
  description: string
  type: string
  upvotes: number
  comments: number
  columnId: string
}

interface KanbanColumn {
  id: string
  title: string
  count: number
  description: string
  color: string
  items: string[]
}

export default function RoadmapPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const router = useRouter()
  const { product } = useProduct(slug)
  const suggestions = product?.suggestions

  const [columns, setColumns] = useState<KanbanColumn[]>([])
  const [items, setItems] = useState<Record<string, KanbanItem>>({})

  // Mutation hook: status güncellemesi için kullanılıyor.
  const updateStatusMutation = useUpdateSuggestionStatus()

  useEffect(() => {
    if (suggestions && suggestions.length > 0 && columns.length === 0) {
      const initialColumns: Record<
        string,
        Omit<KanbanColumn, 'count'> & { items: string[] }
      > = {
        planned: {
          id: 'planned',
          title: 'Planned',
          description: 'Ideas prioritized for research',
          color: 'bg-orange-300',
          items: [],
        },
        'in-progress': {
          id: 'in-progress',
          title: 'In-Progress',
          description: 'Currently being developed',
          color: 'bg-purple-500',
          items: [],
        },
        live: {
          id: 'live',
          title: 'Live',
          description: 'Released features',
          color: 'bg-blue-400',
          items: [],
        },
      }

      const initialItems: Record<string, KanbanItem> = {}

      suggestions.forEach((suggestion: any) => {
        const { id, title, description, category, status, votes, comments } =
          suggestion

        const categoryMapping: Record<string, string> = {
          bug: 'Bug',
          enhancement: 'Enhancement',
          feature: 'Feature',
          ui: 'UI',
          ux: 'UX',
        }
        const type = categoryMapping[category] || category

        initialItems[id] = {
          id,
          title,
          description,
          type,
          upvotes: votes ? votes.length : 0,
          comments: comments ? comments.length : 0,
          columnId: status,
        }

        if (initialColumns[status]) {
          initialColumns[status]!.items.push(id)
        } else {
          initialColumns['planned']!.items.push(id)
        }
      })

      const columnsArray: KanbanColumn[] = Object.values(initialColumns).map(
        (col) => ({
          ...col,
          count: col.items.length,
        })
      )

      setColumns(columnsArray)
      setItems(initialItems)
    }
  }, [suggestions, columns.length])

  const [activeId, setActiveId] = useState<string | null>(null)
  const activeItem = activeId ? items[activeId] : null

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    const activeIdLocal = active.id as string
    const overId = over.id as string
    const activeItemLocal = items[activeIdLocal]
    const activeColumnId = activeItemLocal?.columnId

    const isColumn = columns.some((col) => col.id === overId)

    if (isColumn) {
      const newColumnId = overId

      if (activeColumnId !== newColumnId) {
        // Snapshot: mevcut state'leri saklıyoruz
        const previousColumns = columns
        const previousItems = items

        // Optimistic UI update: yerel state hemen güncelleniyor
        setColumns((prevColumns) =>
          prevColumns.map((col) => {
            if (col.id === activeColumnId) {
              return {
                ...col,
                items: col.items.filter((id) => id !== activeIdLocal),
                count: col.count - 1,
              }
            }
            if (col.id === newColumnId) {
              return {
                ...col,
                items: [...col.items, activeIdLocal],
                count: col.count + 1,
              }
            }
            return col
          })
        )

        setItems((prevItems) => ({
          ...prevItems,
          [activeIdLocal]: {
            ...prevItems[activeIdLocal]!,
            columnId: newColumnId,
          },
        }))

        // Optimistic mutation: sunucuya güncelleme isteği gönderiliyor.
        // Hata durumunda snapshot ile rollback yapılır.
        updateStatusMutation.mutate(
          {
            suggestionId: activeIdLocal,
            newStatus: newColumnId as 'planned' | 'in-progress' | 'live',
          },
          {
            onError: (error, variables, context) => {
              setColumns(previousColumns)
              setItems(previousItems)
            },
          }
        )
      }
    } else {
      // Kart başka bir kartın üzerine bırakıldıysa (aynı kolonda sıralama veya farklı kolona taşıma)
      const overItem = items[overId]
      const overColumnId = overItem?.columnId

      if (activeColumnId === overColumnId) {
        setColumns((prevColumns) =>
          prevColumns.map((col) => {
            if (col.id === activeColumnId) {
              const oldIndex = col.items.indexOf(activeIdLocal)
              const newIndex = col.items.indexOf(overId)
              return {
                ...col,
                items: arrayMove(col.items, oldIndex, newIndex),
              }
            }
            return col
          })
        )
      } else {
        const previousColumns = columns
        const previousItems = items

        setColumns((prevColumns) =>
          prevColumns.map((col) => {
            if (col.id === activeColumnId) {
              return {
                ...col,
                items: col.items.filter((id) => id !== activeIdLocal),
                count: col.count - 1,
              }
            }
            if (col.id === overColumnId) {
              const newItems = [...col.items]
              const overIndex = newItems.indexOf(overId)
              newItems.splice(overIndex, 0, activeIdLocal)
              return {
                ...col,
                items: newItems,
                count: col.count + 1,
              }
            }
            return col
          })
        )
        if (overColumnId) {
          setItems((prevItems) => ({
            ...prevItems,
            [activeIdLocal]: {
              ...prevItems[activeIdLocal]!,
              columnId: overColumnId,
            },
          }))
          updateStatusMutation.mutate(
            {
              suggestionId: activeIdLocal,
              newStatus: overColumnId as 'planned' | 'in-progress' | 'live',
            },
            {
              onError: (error, variables, context) => {
                setColumns(previousColumns)
                setItems(previousItems)
              },
            }
          )
        }
      }
    }

    setActiveId(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 overflow-hidden rounded-xl bg-[#1e2b58] p-4 shadow-md">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-white">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-blue-800"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-bold">Roadmap</h1>
            </div>
            <Button
              onClick={() => router.push(`/${slug}/create-feedback`)}
              className="bg-purple-500 hover:bg-purple-600"
            >
              <Plus className="mr-1 h-4 w-4" /> Add Feedback
            </Button>
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges]}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                items={column.items
                  .map((id) => items[id])
                  .filter((item): item is KanbanItem => item !== undefined)}
              />
            ))}
          </div>

          <DragOverlay>
            {activeId && activeItem ? (
              <div className="w-full max-w-md">
                <KanbanCard
                  item={activeItem}
                  columnType={
                    columns.find((col) => col.id === activeItem.columnId)
                      ?.title || ''
                  }
                  isDragging
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}

interface KanbanColumnProps {
  column: KanbanColumn
  items: KanbanItem[]
}

function KanbanColumn({ column, items }: KanbanColumnProps) {
  const { id, title, count, description, color } = column
  const { setNodeRef, isOver } = useSortable({
    id: id,
    data: { type: 'column' },
  })

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-4 rounded-lg p-2 transition-colors ${
        isOver ? 'bg-slate-100' : ''
      }`}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-slate-800">
            {title} ({count})
          </h2>
        </div>
        <p className="text-sm text-slate-500">{description}</p>
        <div className={`mt-1 h-1 w-full rounded-full ${color}`}></div>
      </div>

      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <SortableKanbanCard key={item.id} item={item} columnType={title} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}

interface KanbanCardProps {
  item: KanbanItem
  columnType: string
  isDragging?: boolean
}

function KanbanCard({ item, columnType, isDragging = false }: KanbanCardProps) {
  // Upvote/Downvote entegrasyonu: Optimistic UI güncellemesi yapıyoruz.
  const [localUpvotes, setLocalUpvotes] = useState(item.upvotes)
  const { data: isVoted } = useVoteStatus(item.id)
  const { mutate: upvote } = useUpvoteMutation(item.id)
  const { mutate: downvote } = useDownvoteMutation(item.id)

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const previous = localUpvotes
    setLocalUpvotes((prev) => prev + 1)
    upvote(undefined, {
      onError: (error) => {
        setLocalUpvotes(previous)
      },
    })
  }

  const handleDownvote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const previous = localUpvotes
    setLocalUpvotes((prev) => prev - 1)
    downvote(undefined, {
      onError: (error) => {
        setLocalUpvotes(previous)
      },
    })
  }

  return (
    <Card
      className={`overflow-hidden shadow-sm transition-all ${
        isDragging ? 'opacity-70 shadow-md' : 'hover:shadow-md'
      }`}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${getStatusColor(item.type)}`}
            ></div>
            <span
              className={`text-sm font-medium ${getStatusColor(item.type)}`}
            >
              {columnType}
            </span>
          </div>
          <GripVertical className="h-4 w-4 cursor-grab text-slate-400" />
        </div>
        <h3 className="mt-2 text-base font-bold text-slate-800">
          {item.title}
        </h3>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-slate-600">{item.description}</p>
        <div className="mt-2">
          <Badge
            variant="outline"
            className={`${getTypeBg(item.type)} border-0 text-xs font-normal`}
          >
            {item.type}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-3">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full"
            onClick={(e) => {
              e.preventDefault()
              if (isVoted) {
                handleDownvote(e)
              } else {
                handleUpvote(e)
              }
            }}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <span className="text-sm text-slate-600">{localUpvotes || 0}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-slate-300"></div>
          <span className="text-sm text-slate-600">{item.comments || 0}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

function SortableKanbanCard({ item, columnType }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: { type: 'item' },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <KanbanCard item={item} columnType={columnType} isDragging={isDragging} />
    </div>
  )
}
