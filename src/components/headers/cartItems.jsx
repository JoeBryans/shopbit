import Image from "next/image";
import { Star } from "lucide-react";

import Qty from "../Cart/Qty";

const CartItems = ({ Items }) => {

  // const num = Math.round(Items?.rating);
  // const rate = new Array(num).fill(0) || [];
  const rate = [1, 2, 3].fill(0);
  const price = Items.price || Items?.product?.price;
  const totalPrice = Items?.qty * price || Items?.totalPrice;
  // const total=cartItems.reduce((acc,item)=>{
  //   return acc+Number(item.qty)*Number(item.price)
  // },0)
  return (
    <div className="flex gap-3 h-28 rounded px-1 mt-5 border-b-2  py-1">
    {
      Items?.images?.length>0&&(
          <Image
            src={Items.images[0]?.url }
            alt={Items?.name}
            width={500}
            height={500}
            className="w-[30%] h-24 object-contain rounded-lg "
          />
      ) 
    }
    {
      Items?.product?.images?.length>0&&(
          <Image
            src={ Items?.product?.images[0]?.url }
            alt={Items?.product?.name}
            width={500}
            height={500}
            className="w-[30%] h-24 object-contain rounded-lg "
          />
      ) 
    }
      <div className="flex flex-col gap-1  ">
        <span className="line-clamp-1">{Items.name}</span>
        {/* <span className="text-gray-700 font-semi-bold">
          quantity: {Items.qty}
        </span> */}

        <span className="text-gray-700 font-semi-bold">${totalPrice}</span>
        <div className="flex gap-3 Items-center ">
          {/* <span>({Items.rating.count} reviews)</span> */}
          <div className="flex gap-1 Items-center">
            <span>{Items.rating}</span>
            {rate.map((i) => {
              return (
                <Star key={Math.random() * 1000} className="text-yellow-500" />
              );
            })}
          </div>
        </div>
        <Qty Items={Items} />

        {/* <DeleteButton Items={Items}/> */}
      </div>
    </div>
  );
};

export default CartItems;
