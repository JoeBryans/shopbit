"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import {z} from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(6),
})
const page = () => {
  return (
    <div>
        
    </div>
  )
}

export default page