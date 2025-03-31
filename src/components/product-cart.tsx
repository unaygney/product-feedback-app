import { CalendarIcon, Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { formatDate } from '@/lib/utils'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    description: string | null
    logo: string | null
    websiteUrl: string | null
    createdAt: Date
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const logo = product.logo
    ? `https://wsrv.nl/?url=${encodeURIComponent(product.logo)}`
    : '/placeholder.png'

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    const isLink = target.closest('a')

    if (!isLink) {
      router.push(`/${product.slug}`)
    }
  }

  return (
    <Card className="cursor-pointer overflow-hidden" onClick={handleCardClick}>
      <CardHeader className="p-0">
        <div className="bg-muted relative h-48 w-full">
          {product.logo ? (
            <Image
              src={logo}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="bg-muted flex h-full w-full items-center justify-center">
              <span className="text-muted-foreground text-xl font-medium">
                {product.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
        {product.description && (
          <p className="text-muted-foreground mb-2 line-clamp-2 text-sm">
            {product.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4 pt-0">
        <div className="text-muted-foreground flex items-center text-xs">
          <CalendarIcon className="mr-1 h-3 w-3" />
          <span>Added {formatDate(product.createdAt)}</span>
        </div>
        {product.websiteUrl && (
          <Link
            href={{ pathname: product.websiteUrl }}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary flex items-center text-xs hover:underline"
          >
            <Globe className="mr-1 h-3 w-3" />
            Visit website
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
