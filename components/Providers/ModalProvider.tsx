'use client'

import { useEffect, useState } from 'react'

import { CardModal } from '@/components/Modals/CardModal'
import { ProModal } from '@/components/Modals/ProModal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  )
}
