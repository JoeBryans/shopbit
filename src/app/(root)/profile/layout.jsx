import React from 'react'
import Sidebar from './_components/Sidebar'

const layout = ({ children }) => {
    return (
        <div className='w-full   '>
            <div className='w-full min-h-[100vh]  flex ju overflow-auto scrollbar-hide  '>
                <Sidebar />
                <main className='ml-5 w-full'>
                    {children}

                </main>
            </div>
        </div>
    )
}

export default layout