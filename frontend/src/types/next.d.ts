/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'next' {
  export interface Metadata {
    title?: string | { default?: string; template?: string }
    description?: string
    icons?: any
    [key: string]: any
  }
  export interface Viewport {
    [key: string]: any
  }
  export type ResolvingMetadata = Promise<Metadata>
  export type ResolvingViewport = Promise<Viewport>
  export type NextConfig = any
  export default function next(options?: any): any
}

declare module 'next/types.js' {
  export interface Metadata {
    title?: string | { default?: string; template?: string }
    description?: string
    icons?: any
    [key: string]: any
  }
  export interface Viewport {
    [key: string]: any
  }
  export type ResolvingMetadata = Promise<Metadata>
  export type ResolvingViewport = Promise<Viewport>
  export type NextConfig = any
}

declare module 'next/dist/*' {
  export interface Metadata {
    title?: string | { default?: string; template?: string }
    description?: string
    icons?: any
    [key: string]: any
  }
  export interface Viewport {
    [key: string]: any
  }
  export type ResolvingMetadata = Promise<Metadata>
  export type ResolvingViewport = Promise<Viewport>
  export type InstantConfigForTypeCheckInternal = any
  export type Prefetch = any
  const content: any
  export default content
}

declare module 'next/image' {
  import * as React from 'react'
  export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string | any
    alt: string
    width?: number
    height?: number
    fill?: boolean
    quality?: number | string
    priority?: boolean
    loading?: 'lazy' | 'eager'
    placeholder?: 'blur' | 'empty'
    blurDataURL?: string
    unoptimized?: boolean
    sizes?: string
  }
  const Image: React.FC<ImageProps>
  export default Image
}

declare module 'next/link' {
  import * as React from 'react'
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string | any
    replace?: boolean
    scroll?: boolean
    prefetch?: boolean
  }
  const Link: React.FC<LinkProps>
  export default Link
}

declare module 'next/font/google' {
  export function Space_Grotesk(options?: any): any
  export function Inter(options?: any): any
  export function Roboto(options?: any): any
  export function Doto(options?: any): any
  export function Space_Mono(options?: any): any
  export function Geist(options?: any): any
  export function Geist_Mono(options?: any): any
  export function Silkscreen(options?: any): any
}
