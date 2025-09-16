import React from 'react'
import Address from '../_components/forms/Address'
import Addresses from './Address';


const page = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/address`, {
        cache: "no-store",
    })

    const address = await res.json();
    console.log("address :", address);

    return (
        <div className='w-full min-h-[100vh]  flex flex-col items-center '>
            {
                address?.length > 0 ? (
                    <div className='w-full'><Addresses address={address} /></div>
                ) : <Address />
            }
            {/* <div></div> */}

        </div>
    )
}

export default page