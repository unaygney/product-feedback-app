'use client'

import { Loader2 } from 'lucide-react'

import { ProductCard } from './product-cart'
import { useProducts } from '@/hooks'

export default function ProductCardsGrid() {
  const { products, isLoading } = useProducts()

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="animate-spin text-purple-400" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
