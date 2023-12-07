'use client'

import { Check, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

import { defaultImages } from '@/constants/images'
// import { unsplash } from '@/lib/unsplash'
import { cn } from '@/lib/utils'

import { FormErrors } from './FormErrors'
import Image from 'next/image'
import Link from 'next/link'

type Errors = Record<string, string[] | undefined>
type Data = Array<Record<string, any>>

interface FormPickerProps {
  id: string
  errors?: Errors
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus()
  const [images, setImages] = useState<Data>(defaultImages)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Commented out for now
        // const result = await unsplash.photos.getRandom({
        //   collectionIds: ['317099'],
        //   count: 9,
        // })
        // if (result && result.response) {
        //   const fetchedImages = result.response as Data
        //   setImages(fetchedImages)
        // } else {
        //   console.error('Error fetching images from Unsplash')
        // }
      } catch (error) {
        console.error(error)
        setImages(defaultImages)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (loading) {
    return (
      <div className='flex p-6 items-center justify-center'>
        <Loader2 className='w-6 h-6 text-violet-600 animate-spin' />
      </div>
    )
  }

  return (
    <div className='relative'>
      <div className='grid grid-cols-3 gap-2 mb-2'>
        {images.map(image => (
          <div
            key={image.id}
            className={cn(
              'relative cursor-pointer aspect-video group hover:opacity-75 transition bg-muted',
              pending && `opacity-50 hover:opacity-50 cursor-auto`,
            )}
            onClick={() => {
              if (pending) return
              setSelectedImage(image.id)
            }}>
            <input
              type='radio'
              readOnly
              id={id}
              name={id}
              className='hidden'
              checked={selectedImage === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              src={image.urls.thumb}
              alt={'Unsplash-image'}
              className='object-cover rounded-md'
              fill
            />
            {selectedImage === image.id && (
              <div className='absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center'>
                <Check className='w-4 h-4 text-white' />
              </div>
            )}
            <Link
              href={image.links.html}
              target='_blank'
              className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/30'>
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>

      <FormErrors errors={errors} id='image' />
    </div>
  )
}
