import React from 'react'
import ProfileCard from './_components/ProfilCard'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
const page = async () => {
    const session = await getServerSession(authOptions)
    const user = session?.user
    if (!user) {
        redirect("/sign-in")
    }
    return (
        <div className='w-full '>
            <ProfileCard />
        </div>
    )
}

export default page