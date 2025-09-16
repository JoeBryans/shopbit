import React from 'react'
import PaymentMethods from '../_components/forms/paymentMethods'

const page = () => {
  // const paymentMethod = useSelector((state) => state.checkout.paymentMethod);
  const paymentMethod = false
  return (
    <div className='w-full min-h-[100vh]  flex flex-col items-center '>
      {
        paymentMethod?.length > 0 ? (
          <div className='w-full'>
          PaymentMethods 
          </div>
        ): <div className = 'w-full'>
        <PaymentMethods paymentMethod = { paymentMethod } />
    </div>
      }
    
      
    </div>
  )

}

export default page