import { Toaster } from 'sonner'

import { ModalProvider } from '@/components/Providers/ModalProvider'
import { QueryProvider } from '@/components/Providers/QueryProvider'

import { ClerkProvider } from '@clerk/nextjs'

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  )
}
