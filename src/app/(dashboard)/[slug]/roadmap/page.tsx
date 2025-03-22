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
import { use, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

interface KanbanItem {
  id: string
  title: string
  description: string
  type: 'Feature' | 'Enhancement' | 'Bug'
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
  params: Promise<{ productName: string }>
}) {
  const { productName } = use(params)

  const router = useRouter()

  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: 'planned',
      title: 'Planned',
      count: 2,
      description: 'Ideas prioritized for research',
      color: 'bg-orange-300',
      items: ['item-1', 'item-2'],
    },
    {
      id: 'in-progress',
      title: 'In-Progress',
      count: 3,
      description: 'Currently being developed',
      color: 'bg-purple-500',
      items: ['item-3', 'item-4', 'item-5'],
    },
    {
      id: 'live',
      title: 'Live',
      count: 1,
      description: 'Released features',
      color: 'bg-blue-400',
      items: ['item-6'],
    },
  ])

  const [items, setItems] = useState<Record<string, KanbanItem>>({
    'item-1': {
      id: 'item-1',
      title: 'More comprehensive reports',
      description:
        'It would be great to see a more detailed breakdown of solutions.',
      type: 'Feature',
      upvotes: 123,
      comments: 2,
      columnId: 'planned',
    },
    'item-2': {
      id: 'item-2',
      title: 'Learning paths',
      description:
        'Sequenced projects for different goals to help people improve.',
      type: 'Feature',
      upvotes: 28,
      comments: 1,
      columnId: 'planned',
    },
    'item-3': {
      id: 'item-3',
      title: 'One-click portfolio generation',
      description:
        'Add ability to create professional looking portfolio from profile.',
      type: 'Feature',
      upvotes: 62,
      comments: 1,
      columnId: 'in-progress',
    },
    'item-4': {
      id: 'item-4',
      title: 'Bookmark challenges',
      description: 'Be able to bookmark challenges to take later on.',
      type: 'Feature',
      upvotes: 31,
      comments: 1,
      columnId: 'in-progress',
    },
    'item-5': {
      id: 'item-5',
      title: 'Animated solution screenshots',
      description:
        "Screenshots of solutions with animations don't display correctly.",
      type: 'Bug',
      upvotes: 9,
      comments: 0,
      columnId: 'in-progress',
    },
    'item-6': {
      id: 'item-6',
      title: 'Add micro-interactions',
      description: 'Small animations at specific points can add delight.',
      type: 'Enhancement',
      upvotes: 71,
      comments: 2,
      columnId: 'live',
    },
  })

  // State for active dragging
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeItem = activeId ? items[activeId] : null

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    const activeId = active.id as string
    const overId = over.id as string

    // Find the columns
    const activeItem = items[activeId]
    const activeColumnId = activeItem?.columnId

    // Check if the item is dropped on a column
    const isColumn = columns.some((col) => col.id === overId)

    if (isColumn) {
      // Item dropped on a column
      const newColumnId = overId

      if (activeColumnId !== newColumnId) {
        // Update the columns
        setColumns((prevColumns) => {
          return prevColumns.map((col) => {
            // Remove from old column
            if (col.id === activeColumnId) {
              return {
                ...col,
                items: col.items.filter((id) => id !== activeId),
                count: col.count - 1,
              }
            }
            // Add to new column
            if (col.id === newColumnId) {
              return {
                ...col,
                items: [...col.items, activeId],
                count: col.count + 1,
              }
            }
            return col
          })
        })

        // Update the item
        setItems((prevItems) => ({
          ...prevItems,
          [activeId]: {
            ...prevItems[activeId],
            columnId: newColumnId,
          } as KanbanItem,
        }))
      }
    } else {
      // Item dropped on another item
      const overItem = items[overId]
      const overColumnId = overItem?.columnId

      if (activeColumnId === overColumnId) {
        // Same column reordering
        setColumns((prevColumns) => {
          return prevColumns.map((col) => {
            if (col.id === activeColumnId) {
              const oldIndex = col.items.indexOf(activeId)
              const newIndex = col.items.indexOf(overId)

              return {
                ...col,
                items: arrayMove(col.items, oldIndex, newIndex),
              }
            }
            return col
          })
        })
      } else {
        // Moving between columns
        setColumns((prevColumns) => {
          return prevColumns.map((col) => {
            // Remove from old column
            if (col.id === activeColumnId) {
              return {
                ...col,
                items: col.items.filter((id) => id !== activeId),
                count: col.count - 1,
              }
            }
            // Add to new column
            if (col.id === overColumnId) {
              const newItems = [...col.items]
              const overIndex = newItems.indexOf(overId)
              newItems.splice(overIndex, 0, activeId)

              return {
                ...col,
                items: newItems,
                count: col.count + 1,
              }
            }
            return col
          })
        })

        // Update the item
        setItems((prevItems) => ({
          ...prevItems,
          [activeId]: {
            ...prevItems[activeId],
            columnId: overColumnId,
          } as KanbanItem,
        }))
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
              onClick={() => router.push(`/${productName}/create-feedback`)}
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
                items={column?.items
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
    data: {
      type: 'column',
    },
  })

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-4 rounded-lg p-2 transition-colors ${isOver ? 'bg-slate-100' : ''}`}
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
  const [upvotes, setUpvotes] = useState(item.upvotes)

  const getStatusColor = () => {
    switch (columnType) {
      case 'Planned':
        return 'text-orange-500'
      case 'In-Progress':
        return 'text-purple-500'
      case 'Live':
        return 'text-blue-500'
      default:
        return 'text-gray-500'
    }
  }

  const getTypeBg = () => {
    switch (item.type) {
      case 'Feature':
        return 'bg-blue-100 text-blue-700'
      case 'Enhancement':
        return 'bg-purple-100 text-purple-700'
      case 'Bug':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <Card
      className={`overflow-hidden shadow-sm transition-all ${isDragging ? 'opacity-70 shadow-md' : 'hover:shadow-md'}`}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${getStatusColor()}`}></div>
            <span className={`text-sm font-medium ${getStatusColor()}`}>
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
            className={`${getTypeBg()} border-0 text-xs font-normal`}
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
            onClick={() => setUpvotes((prev) => prev + 1)}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <span className="text-sm text-slate-600">{upvotes}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-slate-300"></div>
          <span className="text-sm text-slate-600">{item.comments}</span>
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
    data: {
      type: 'item',
    },
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
