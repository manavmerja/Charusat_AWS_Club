"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type AccordionContextType = {
  isOpen: boolean
  toggle: () => void
}

const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined)

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

function Accordion({ children, className, ...props }: AccordionProps) {
  return (
    <div data-slot="accordion" className={cn("w-full", className)} {...props}>
      {children}
    </div>
  )
}

type AccordionItemProps = {
  children: React.ReactNode
  className?: string
  defaultOpen?: boolean
}

function AccordionItem({ children, className, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const toggle = React.useCallback(() => setIsOpen((prev) => !prev), [])

  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <div className={cn("border-b border-white/10 last:border-b-0", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

type AccordionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  showArrow?: boolean
  children: React.ReactNode
}

function AccordionButton({
  className,
  children,
  showArrow = true,
  ...props
}: AccordionButtonProps) {
  const context = React.useContext(AccordionContext)
  const isOpen = context?.isOpen ?? false
  const toggle = context?.toggle

  return (
    <button
      type="button"
      onClick={toggle}
      data-open={isOpen ? "" : undefined}
      aria-expanded={isOpen}
      className={cn(
        "group flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium",
        "text-white transition-colors duration-200 outline-none cursor-pointer",
        "hover:text-[#00e676] data-[open]:text-[#00e676]",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {showArrow && (
        <ChevronDownIcon
          className={cn(
            "size-4 shrink-0 text-[#00e676] transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      )}
    </button>
  )
}

type AccordionPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  className?: string
}

function AccordionPanel({ children, className, ...props }: AccordionPanelProps) {
  const context = React.useContext(AccordionContext)
  const isOpen = context?.isOpen ?? false

  return (
    <div
      className={cn(
        "grid transition-all duration-300 ease-in-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        className
      )}
      {...props}
    >
      <div className="overflow-hidden">
        <div className="pb-4 text-sm text-slate-400 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

export {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionButtonProps,
  type AccordionPanelProps,
}