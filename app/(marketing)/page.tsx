import { Medal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { routes } from '@/constants'
import { cn, headingFont } from '@/lib/utils'

import { Poppins } from 'next/font/google'
import Link from 'next/link'

const textFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function MarketingPage() {
  return (
    <div className='flex items-center justify-center flex-col'>
      <div
        className={cn(
          'flex items-center justify-center flex-col',
          headingFont.className,
        )}>
        <div className='mb-4 flex items-center border shadow-sm p-4 bg-violet-100 text-violet-700 rounded-full uppercase'>
          <Medal className='h-6 w-6 mr-2' />
          No 1 task management
        </div>
        <h1 className='text-3xl md:text-6xl text-center text-neutral-800 mb-6'>
          Task-IFY helps you manage your tasks
        </h1>
        <div className='text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white px-4 p-2 rounded-md pb-4 w-fit'>
          with ease.
        </div>
      </div>

      <div
        className={cn(
          'text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto',
          textFont.className,
        )}>
        Collaborate, manage and track your projects. From single tasks to
        complex projects across different teams with multiple people. Get ready
        to easily manage it with Task-IFY.
      </div>

      <Button
        className='mt-6 bg-gradient-to-r from-fuchsia-600 to-violet-600'
        size={'lg'}
        asChild>
        <Link href={routes.signUp}>Get started for free</Link>
      </Button>
    </div>
  )
}
