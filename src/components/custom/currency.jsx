import { cn } from '@/lib/utils'
import React from 'react'

const Currency = ({ price, className }) => {
    const currency = price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'NGN',
      })
    
  return <span className={cn(className)}>{currency}</span>
}

export default Currency