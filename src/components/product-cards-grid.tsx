'use client'

import { useState } from 'react'

import { ProductCard } from './product-cart'

type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  logo: string | null
  websiteUrl: string | null
  ownerId: string
  createdAt: Date
  updatedAt: Date
}

// Örnek ürün verileri
const placeholderProducts = [
  {
    id: '1',
    name: 'Akıllı Ev Sistemi',
    slug: 'akilli-ev-sistemi',
    description:
      'Evinizi akıllı hale getiren kompakt ve kullanımı kolay bir sistem. Işıkları, ısıtmayı ve güvenliği kontrol edin.',
    logo: '/placeholder.svg',
    websiteUrl: 'https://example.com/smart-home',
    ownerId: 'user1',
    createdAt: new Date('2025-02-15'),
    updatedAt: new Date('2025-02-15'),
  },
  {
    id: '2',
    name: 'Fitness Takip Uygulaması',
    slug: 'fitness-takip-uygulamasi',
    description:
      'Günlük aktivitelerinizi, egzersizlerinizi ve beslenmenizi takip eden kapsamlı bir fitness uygulaması.',
    logo: '/placeholder.svg',
    websiteUrl: 'https://example.com/fitness-app',
    ownerId: 'user1',
    createdAt: new Date('2025-03-01'),
    updatedAt: new Date('2025-03-10'),
  },
  {
    id: '3',
    name: 'E-Ticaret Platformu',
    slug: 'e-ticaret-platformu',
    description:
      'Küçük işletmeler için özelleştirilebilir ve kullanımı kolay bir e-ticaret çözümü.',
    logo: null,
    websiteUrl: 'https://example.com/ecommerce',
    ownerId: 'user1',
    createdAt: new Date('2025-03-20'),
    updatedAt: new Date('2025-03-25'),
  },
  {
    id: '4',
    name: 'Proje Yönetim Aracı',
    slug: 'proje-yonetim-araci',
    description:
      'Ekipler için tasarlanmış, görev takibi ve iş akışı yönetimi sağlayan bir araç.',
    logo: '/placeholder.svg',
    websiteUrl: null,
    ownerId: 'user1',
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-15'),
  },
]

export default function ProductCardsGrid() {
  const [products] = useState<Product[]>(placeholderProducts)

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
