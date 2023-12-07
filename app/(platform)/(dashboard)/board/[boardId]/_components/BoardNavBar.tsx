import { BoardOptions } from './BoardOptions'
import { BoardTitleForm } from './BoardTitleForm'
import { Board } from '@prisma/client'

interface BoardNavBarProps {
  boardData: Board
}

export const BoardNavBar = async ({ boardData }: BoardNavBarProps) => {
  return (
    <div className='w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white'>
      <BoardTitleForm boardData={boardData} />
      <div className='ml-auto'>
        <BoardOptions id={boardData.id} />
      </div>
    </div>
  )
}
