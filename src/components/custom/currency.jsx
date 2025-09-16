import { cn } from '@/lib/utils'
import React from 'react'

const Currency = ({ price, className }) => {
  const currency = price.toLocaleString('en-NG', {
        style: 'currency',
      currency: 'NGN',
      currencyDisplay: 'symbol',
      })
    
  return <span className={cn(className)}>{currency}</span>
}

export default Currency