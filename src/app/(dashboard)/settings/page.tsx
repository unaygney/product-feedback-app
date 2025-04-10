'use client'

import { Plus, UserCircle } from 'lucide-react'
import { useState } from 'react'

import { authClient } from '@/lib/auth-client'

import AddProductForm from '@/components/add-product-form'
import ProductCardsGrid from '@/components/product-cards-grid'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import UpdateProfileForm from '@/components/update-profile-form'

export default function AddProductPage() {
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)

  const { data: user, refetch } = authClient.useSession()

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Please log in to view this page</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-10 p-4 lg:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Products</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-2"
          >
            <UserCircle className="h-4 w-4" />
            Update Profile
          </Button>
          <Button
            onClick={() => setShowAddProductModal(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add New Product
          </Button>
        </div>
      </div>

      <ProductCardsGrid />

      {/* Modal for adding new product */}
      <Modal
        showModal={showAddProductModal}
        setShowModal={setShowAddProductModal}
        className="p-6"
      >
        <AddProductForm />
      </Modal>

      {/* Modal for updating profile */}
      <Modal
        showModal={showProfileModal}
        setShowModal={setShowProfileModal}
        className="p-6"
      >
        <UpdateProfileForm
          user={user?.user}
          refetch={refetch}
          onClose={() => setShowProfileModal(false)}
        />
      </Modal>
    </div>
  )
}
