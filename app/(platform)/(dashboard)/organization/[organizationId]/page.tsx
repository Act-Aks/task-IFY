import { createBoard } from '@/actions/create-board'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/useAction'
import { db } from '@/lib/db'

import { Info } from './info'

export default async function OrganizationPage() {
  return (
    <div className='flex flex-col space-y-2'>
      <Info />
    </div>
  )
}
