import type { ImageLoaderProps } from 'next/image'

export default function customImageLoader({ src }: ImageLoaderProps): string {
  return src
}