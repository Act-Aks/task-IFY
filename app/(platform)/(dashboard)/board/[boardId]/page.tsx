import { fetchLists } from '@/actions/fetch-lists'
import { generateRoute } from '@/lib/utils'

import { ListContainer } from './_components/ListContainer'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface BoardIdPageProps {
  params: {
    boardId: string
  }
}

export default async function BoardIdPage({ params: { boardId } }: BoardIdPageProps) {
  const { orgId } = auth()

  if (!orgId) {
    redirect(generateRoute('selectOrg'))
  }

  const { lists } = await fetchLists(orgId, boardId)

  return (
    <div className='p-4 h-full overflow-auto'>
      <ListContainer data={lists} boardId={boardId} />
    </div>
  )
}
