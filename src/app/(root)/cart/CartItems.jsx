"use client";
import Image from "next/image";
import RemoveOption from "@/components/Cart/RemoveOption";
import Qty from "@/components/Cart/Qty";
import Currency from "@/components/custom/currency";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export const UnSignedInUserCartCard = ({ CartItems }) => {
  // const num = Math.round(Items?.rating);
  // const rate = new Array(num).fill(1);
  const rate = [1, 2, 3, 4, 5].fill(0);
  console.log("quantity", CartItems);

  const items = CartItems;
  console.log("Items", items);

  const price = items?.price;
  const totalPrice = items?.qty * price;

  // const total=cartItems.reduce((acc,item)=>{
  //   return acc+Number(item.qty)*Number(item.price)
  // },0)
  return (
    <div className="flex md:w-[500px] w-full gap-3 shadow-lg px-3 mt-5 border-b-2 h-44 py-1 items-center rounded-lg ">
      <div className=" w-36 h-28 flex items-center justify-center rounded-lg">
        <Image
          src={items?.images[0]?.url}
          alt="image"
          width={100}
          height={100}
          priority
          className="w-[100%] h-[80%] object-contain rounded-lg hover:scale-110 transition-all duration-300 ease-in-out cusor-pointer"
        />
      </div>
      <div className="flex flex-col gap-1 w-72  ">
        <div className="">
          <span className="line-clamp-1">{items?.name}</span>
        </div>
        {/* <span className="text-gray-700 font-semi-bold">
          ${CartItems?.price}
        </span> */}
        <span className="text-gray-700 font-semi-bold">${totalPrice}</span>

        <div className="flex flex-col w-full mt-1">
          <Qty items={items} />

          <div className="w-full flex justify-end my-3">
            <RemoveOption CartItems={CartItems} />
          </div>
          {/* <div className="w-max flex justify-end my-3">
          </div> */}
        </div>

        {/* <DeleteButton items={Items}/> */}
      </div>
    </div>
  );
};


export const SignedInUserCartCard = ({ CartItems }) => {
  // console.log("CartItems", CartItems);
  const [isLoading, setIsLoading] = useState(false);
  const { data: user, status } = useSession();
  const router = useRouter();

  // const Increment = async () => {
  //   // dispatch(addToCart(item));
  //   if (!user) {
  //     return
  //   }
  //   try {
  //     const res = await fetch("/api/cart", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(
  //         {
  //           productId: CartItems?.productId,
  //           quantity: 1,
  //           price: CartItems?.product?.price
  //         }
  //       )
  //     })
  //     console.log(res);
  //     const datas = await res.json();
  //     if (datas?.ok) {
  //       setIsLoading(false);
  //       toast.success(datas?.message);
  //       router.refresh();
        
  //     }
  //     else {
  //       setIsLoading(false);
  //       toast.error(datas?.message);
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.log("error", error);
  //     toast.error(error);
  //   }

  // };
  // const Decrement = (item) => {
    // dispatch(DecreaseQty(item));
  // };

  return (


    <div className="flex md:w-[500px] w-full gap-3 shadow-lg px-3 mt-5 border-b-2 h-44 py-1 items-center rounded-lg ">
      <div className=" w-36 h-28 flex items-center justify-center rounded-lg">
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
        {/* <span className="text-gray-700 font-semi-bold">
          ${CartItems?.product?.price}
        </span> */}
        {/* <span className="text-gray-700 font-semi-bold">${CartItems?. totalPrice}</span> */}
        <Currency price={CartItems?.totalPrice} />

        <div className="flex flex-col w-full mt-1">
          {/* <div className="w-full flex items-center justify-start gap-4">
            <Button
              size={"sm"}
              variant={"outline"}
              className="text-xl font-semibold"
              onClick={Increment}
            >
              {isLoading ? <Loader isLoading={isLoading} /> : <>+</>}
            </Button>
            <Button
              size={"sm"}
              variant={"outline"}
              className="text-xl font-semibold"
            >
              {CartItems?.quantity}
            </Button>
            <Button
              size={"sm"}
              variant={"outline"}
              className="text-xl font-semibold"
            // onClick={() => Decrement(items)}
            >
              -
            </Button>
          </div> */}
          <Qty items={CartItems} />
          <div className="w-full flex justify-end my-3">
            {/* <RemoveOption CartItems={CartItems} /> */}
          </div>
          {/* <div className="w-max flex justify-end my-3">
          </div> */}
        </div>

        {/* <DeleteButton items={Items}/> */}
      </div>
    </div>

  );
};

