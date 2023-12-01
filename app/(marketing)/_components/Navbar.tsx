import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { routes } from '@/constants'

import Link from 'next/link'

export const Navbar = () => {
  return (
    <div className='fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center'>
      <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
        <Logo />
        <div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
          <Button size={'sm'} variant={'outline'} asChild>
            <Link href={routes.signIn}>Login</Link>
          </Button>
          <Button
            size={'sm'}
            className='bg-gradient-to-r from-fuchsia-600 to-violet-600'
            asChild>
            <Link href={routes.signUp}>Get started for free</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
