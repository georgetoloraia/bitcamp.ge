"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"

const pinCode = "1024"

function PinProtected({ 
  href,
  className,
  children,
  disabled,
  ...props
}) {
  const [pin, setPin] = useState("")
  const [isVerified, setIsVerified] = useState(window.localStorage.getItem("pin") === pinCode)

  const handlePinSubmit = (event) => {
    event.preventDefault()

    if (pin === pinCode) {
      window.localStorage.setItem("pin", pinCode);
      setIsVerified(true)
    }
  }

  return (
  <div
    className={cn(
      disabled && "cursor-not-allowed opacity-60",
      className
    )}
    {...props}
  >
      {!isVerified ? (
        <form onSubmit={handlePinSubmit}>
          <label>
            {children[0]}
            <Input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="შეიყვანეთ პინ კოდი"
            />
          </label>
        </form>
      ) : (
        <div>
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0 [&>p]:text-muted-foreground">
              {children[1]}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PinProtected
