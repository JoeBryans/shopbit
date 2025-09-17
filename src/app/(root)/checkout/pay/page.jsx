"use client"
import React from 'react'
import CheckoutForm from './payCard'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadClientSecret } from '@/hooks/store/localstorage';
import { useRouter } from 'next/navigation';
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const page = () => {
  const router = useRouter();
  const clientSecret = loadClientSecret("clientSecret");
  console.log(" clientSecret", clientSecret);
  if (clientSecret === null || clientSecret === "" || clientSecret === undefined) {
    router.push("/checkout/summary");
  }
  return (
    <div className='w-full min-h-[100vh]  flex flex-col items-center justify-center '>
    <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",

              labels: "above",
            },
          }}
        >
          {
            clientSecret !== undefined && (
              <CheckoutForm clientSecret={clientSecret} />
            )
          }
        </Elements>
      
    </div>
  )
}

export default page