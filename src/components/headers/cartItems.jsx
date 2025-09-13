import Image from "next/image";
import { Star } from "lucide-react";

import Qty from "../Cart/Qty";

const CartItems = ({ Items }) => {
  const items = Items;

  // const num = Math.round(items?.rating);
  // const rate = new Array(num).fill(0) || [];
  const rate = [1, 2, 3].fill(0);
  const price = items.price;
  const totalPrice = items?.qty * price;
  // const total=cartItems.reduce((acc,item)=>{
  //   return acc+Number(item.qty)*Number(item.price)
  // },0)
  return (
    <div className="flex gap-3 h-28 rounded px-1 mt-5 border-b-2  py-1">
      <Image
        src={items.image[0]?.url}
        alt=""
        width={100}
        height={100}
        className="w-[30%] h-24 object-contain rounded-lg "
      />
      <div className="flex flex-col gap-1  ">
        <span className="line-clamp-1">{items.name}</span>
        {/* <span className="text-gray-700 font-semi-bold">
          quantity: {Items.qty}
        </span> */}

        <span className="text-gray-700 font-semi-bold">${totalPrice}</span>
        <div className="flex gap-3 items-center ">
          {/* <span>({Items.rating.count} reviews)</span> */}
          <div className="flex gap-1 items-center">
            <span>{items.rating}</span>
            {rate.map((i) => {
              return (
                <Star key={Math.random() * 1000} className="text-yellow-500" />
              );
            })}
          </div>
        </div>
        <Qty items={Items} />

        {/* <DeleteButton items={Items}/> */}
      </div>
    </div>
  );
};

export default CartItems;
