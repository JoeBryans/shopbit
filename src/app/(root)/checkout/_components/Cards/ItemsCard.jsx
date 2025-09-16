import Currency from '@/components/custom/currency';
import Image from 'next/image';
import React from 'react'

export const ItemsCard = ({ CartItems }) => {
   return (
    <div className="max-w-md flex  w-full gap-2  px-3   h-32 py-1 items-center  ">
      <div className=" w-36 h-24 flex items-center justify-center rounded-lg">
        <Image
          src={CartItems?.product?.images[0]?.url}
          alt="image"
          width={100}
          height={100}
          priority
          className="w-[100%] h-[80%] object-contain rounded-lg hover:scale-110 transition-all duration-300 ease-in-out cusor-pointer"
        />
      </div>
      <div className="flex flex-col gap-1 w-72  ">
        <div className="">
          <span className="line-clamp-1">{CartItems?.product?.name}</span>
        </div>
            <Currency price={CartItems?.totalPrice} />
      </div>
    </div>

  );
};
