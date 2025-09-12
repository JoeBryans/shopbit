import React from 'react'

const NotFound = () => {
    return (
        <div className='w-full min-h-screen flex flex-col justify-center items-center'>
            <div className='max-w-2xl w-[90%] *:p-6 bg-white rounded-lg shadow-md'>
                <h1 className='text-3xl font-bold text-center mt-10'>404 - Page Not Found</h1>
                <p className='text-center mt-4'>The page you are looking for does not exist.</p>
                <Link href='/' className='text-center mt-4 text-blue-500 underline'>Go back to Home</Link>
            </div>
        </div>
    )
}

export default NotFound