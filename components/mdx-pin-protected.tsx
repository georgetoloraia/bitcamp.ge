"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

function PinProtected({ 
  href,
  className,
  children,
  disabled,
  ...props
}) {
  const [pin, setPin] = useState("")
  const [isVerified, setIsVerified] = useState(false)

  const handlePinSubmit = (event) => {
    event.preventDefault()

    if (pin === "1234") {
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
            Enter PIN:<br/>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </label>
        </form>
      ) : (
        <div>
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0 [&>p]:text-muted-foreground">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PinProtected
