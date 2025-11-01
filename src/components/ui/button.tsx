"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary: "bg-accent text-background hover:bg-accent/85",
        secondary: "bg-card-bg text-foreground border border-card-border hover:bg-accent/10",
        outline: "bg-transparent text-accent border border-accent hover:bg-accent/10",
        ghost: "bg-transparent text-foreground hover:bg-foreground/10",
        destructive: "bg-error text-background hover:bg-error/85",
        success: "bg-success text-background hover:bg-success/85",
        warning: "bg-warning text-foreground hover:bg-warning/85",
        link: "text-accent underline underline-offset-4 hover:text-accent/80",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-9 px-4 text-sm",
        lg: "h-10 px-6 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
}
