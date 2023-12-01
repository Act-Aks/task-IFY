import { routes } from '@/constants'
import { cn, headingFont } from '@/lib/utils'

import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href={routes.home}>
      <div className='hover:opacity-75 trasition items-center gap-x-2 hidden md:flex'>
        <Image src={'/logo.svg'} alt='logo' width={30} height={30} />
        <p
          className={cn(
            'text-lg text-neutral-700 pb-1',
            headingFont.className,
          )}>
          Task-IFY
        </p>
      </div>
    </Link>
  )
}
