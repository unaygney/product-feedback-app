import type { Metadata } from 'next'

import AddProductForm from '@/components/add-product-form'

export const metadata: Metadata = {
  title: 'Add New Product',
  description: 'Create a new product in your dashboard',
}

export default function AddProductPage() {
  return <AddProductForm />
}
