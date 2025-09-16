import React from 'react'
import Summary from './_components/Summary'

const page = ({ children }) => {
  return (
    <div className='w-full min-h-[100vh]  flex flex-col items-center '>
      <main className='max-w-6xl  my-14 w-full flex flex-wrap gap-4 items-start '>

        <div className='max-w-2xl w-full mx-auto'>
          {children}
        </div>

        {/* <Summary /> */}
      </main>
    </div>
  )
}

export default page