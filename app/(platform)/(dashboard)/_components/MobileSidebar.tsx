'use client'

import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useMobileSidebar } from '@/hooks/useMobileSidebar'

import { Sidebar } from './SideBar'
import { usePathname } from 'next/navigation'

export const MobileSidebar = () => {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const isOpen = useMobileSidebar(state => state.isOpen)
  const onOpen = useMobileSidebar(state => state.onOpen)
  const onClose = useMobileSidebar(state => state.onClose)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Button onClick={onOpen} variant={'ghost'} size={'sm'} className='block md:hidden mr-2'>
        <Menu className='w-4 h-4' />
      </Button>

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={'left'} className='p-2 pt-10'>
          <Sidebar storageKey={'mobile-sidebar-state'} />
        </SheetContent>
      </Sheet>
    </>
  )
}
