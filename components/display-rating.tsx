'use client'
import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

type DisplayRatingProps = {
  value?: number
  editable?: boolean
  onChange?: (value: number) => void
  size?: number
  starClassName?: string // ✅ new prop
}

const DisplayRating = ({
  value = 0,
  editable = false,
  onChange,
  size = 20,
  starClassName = '',
}: DisplayRatingProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  // Round to nearest 0.5
  const roundedValue = Math.round(value * 2) / 2

  const handleClick = (index: number) => {
    if (editable && onChange) {
      onChange(index)
    }
  }

  return (
    <div className="flex items-center gap-1 text-am">
      {[1, 2, 3, 4, 5].map((index) => {
        const filled =
          hoverValue !== null ? index <= hoverValue : index <= roundedValue
        const half =
          hoverValue !== null
            ? false
            : roundedValue >= index - 0.5 && roundedValue < index

        return (
          <div
            key={index}
            onMouseEnter={() => editable && setHoverValue(index)}
            onMouseLeave={() => editable && setHoverValue(null)}
            onClick={() => handleClick(index)}
            className={cn(
              'cursor-pointer',
              !editable && 'cursor-default'
            )}
          >
            <Star
              className={cn(starClassName)}
              fill={filled ? '#bb4d00' : half ? 'url(#halfGradient)' : 'none'}
              stroke={filled || half ? '#bb4d00' : '#d1d5db'}
              width={size}
              height={size}
            />
          </div>
        )
      })}

      {/* SVG gradient for half star */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="halfGradient">
            <stop offset="50%" stopColor="#bb4d00" />
            <stop offset="50%" stopColor="white" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default DisplayRating
