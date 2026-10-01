"use client"

import * as React from "react"

export type DisclosureProps = {
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
}

export function Disclosure({ defaultOpen = false, children }: DisclosureProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  return <div>{children}</div>
}