import Currency from '@/components/custom/currency'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Summary = () => {
    const cart=null
  return (
      <div className='w-[300px] p-4 bg-white  mx-auto'>

          <h1 className='text-xl font-semibold text-gray-700 mb-4 border-b-1'>Your Cart Summary</h1>
          {/* items total */}
          <div className='flex justify-between items-center border-b-1 '>
              <span className='text-gray-700 font-semibold text-sm'>Item's Total ({cart && cart.length})</span>
              {
                  cart && cart.length > 0 ? (
                      <Currency price={totalPrice} />
                  ) : null
              }
          </div>
          {/* shipping */}
          <div className='flex justify-between items-center mt-2 border-b-1 '>
              <span className='text-gray-700 font-semibold'>Shipping</span>
              <span className='text-gray-700 font-semibold'>Free</span>
          </div>
          {/* Sub total */}
          <div className='flex justify-between items-center mt-2 border-b-1 '>
              <span className='text-gray-700 font-semibold'>Sub Total</span>
              {
                  cart && cart.length > 0 ? (
                      <Currency price={totalPrice} />
                  ) : null
              }
          </div>

          {
              cart?.length > 0 && (
                  <Link href={"/checkout"} className="mt-4 text-blue-600">

                      <Button
                          variant={"primary"}
                          className={"flex justify-center items-center gap-2 mt-4 w-full"}

                      >
                          <span className=' font-semibold text-sm'>Proceed to Checkout</span>
                          ({
                              cart && cart.length > 0 ? <Currency price={totalPrice}
                                  className={"text-xs line-clamp-1"}
                              /> : null
                          })

                      </Button>
                  </Link>
              )
          }



      </div>
  )
}

export default Summary