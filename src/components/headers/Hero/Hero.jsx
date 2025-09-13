import React from 'react'
import CardCarousel from './card'

const Hero = () => {
    return (
        <div className='w-full  flex flex-col items-center gap-10 '>
            {/* <h1 className='text-4xl font-bold'>Vivi</h1>
      <p className='text-xl'>Your one-stop shop for all your favorite products</p> */}
            <CardCarousel />
        </div>
    )
}

export default Hero