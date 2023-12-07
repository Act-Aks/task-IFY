import { Separator } from '@/components/ui/separator'

import { BoardList } from './_components/BoardList'
import { Info } from './_components/Info'

export default async function OrganizationPage() {
  return (
    <div className='w-full mb-20'>
      <Info />
      <Separator className='my-4' />
      <div className='px-2 md:px-4'>
        <BoardList />
      </div>
    </div>
  )
}
