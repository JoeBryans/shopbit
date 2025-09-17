import React from 'react'
import Summary from './_components/Summary'
import Wrapper from './Wrapper'

const page = ({ children }) => {
  return (
    <div className='w-full min-h-[100vh]  flex flex-col items-center '>
      <Wrapper>
          {children}
      </Wrapper>
    </div>
  )
}

export default page