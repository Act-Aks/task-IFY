import { fetchBoardById } from '@/actions/fetch-boards'
import { generateRoute } from '@/lib/utils'

import { BoardNavBar } from './_components/BoardNavBar'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export async function generateMetadata({ params }: { params: { boardId: string } }) {
  const { orgId } = auth()

  if (!orgId) {
    return {
      title: 'Board',
    }
  }

  const { board } = await fetchBoardById(orgId, params.boardId)

  return {
    title: board.title,
  }
}

export default async function BoardIdLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { boardId: string }
}) {
  const { orgId } = auth()

  if (!orgId) {
    redirect(generateRoute('selectOrg'))
  }

  const { board } = await fetchBoardById(orgId, params.boardId)

  return (
    <div
      className='h-full relative bg-no-repeat bg-cover bg-center'
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}>
      <BoardNavBar boardData={board} />
      <div className='absolute inset-0 bg-black/10' />
      <main className='relative pt-28 h-full'>{children}</main>
    </div>
  )
}
