'use client'

import { Plus } from 'lucide-react'
import { useLocalStorage } from 'usehooks-ts'

import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { routes } from '@/constants'

import { NavItem, Organization } from './NavItem'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import Link from 'next/link'

interface SidebarProps {
  storageKey?: string
}

export const Sidebar = ({ storageKey = 'sidebar-state' }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})
  const { organization: activeOrganization, isLoaded: isOrganizationLoaded } = useOrganization()
  const { userMemberships, isLoaded: isOrganizationListLoaded } = useOrganizationList({
    userMemberships: { infinite: true },
  })

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key)
      }

      return acc
    },
    [],
  )

  const onExpand = (id: string) => {
    setExpanded(current => ({
      ...current,
      [id]: !current[id],
    }))
  }

  if (!isOrganizationLoaded || !isOrganizationListLoaded || userMemberships.isLoading) {
    return (
      <>
        <div className='flex items-center justify-between mb-2'>
          <Skeleton className='h-10 w-[50%]' />
          <Skeleton className='h-10 w-10' />
        </div>
        <div className='space-y-2'>
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    )
  }

  return (
    <>
      <div className='font-medium text-xs flex items-center mb-1'>
        <span className='pl-4'>Workspaces</span>
        <Button asChild type='button' size={'icon'} variant={'ghost'} className='ml-auto'>
          <Link href={routes.selectOrg}>
            <Plus className='w-4 h-4' />
          </Link>
        </Button>
      </div>

      <Accordion type='multiple' defaultValue={defaultAccordionValue} className='space-y-2'>
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={organization.id === activeOrganization?.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  )
}
