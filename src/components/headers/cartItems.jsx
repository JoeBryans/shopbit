"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/hooks/store/cartSlice";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
const CartItems = ({ Items }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    {
      mutationFn: async (data) => {
        console.log("data", data);

        try {
          const res = await fetch("/api/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(
              {
                productId: data?.productId,
                quantity: data?.quantity,
                price: data?.price
              }
            )
          })
          const datas = await res.json();
          if (res?.ok) {
            toast.success(datas?.message);
            return datas;
          } else {
            toast.error(datas?.message);
          }
        }
        catch (error) {
          console.log(error);
          toast.error(error);
          return error;
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["cart"]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  )
  const dispatch = useDispatch();
  const { data: user, status } = useSession();
  const userId = user?.user?.id;

  const AddToCart = async (item) => {
    if (userId) {
      mutation.mutate({
        productId: item?.productId,
        quantity: item?.quantity || 1,
        price: item?.totalPrice
      })
    }
    else {
      dispatch(addToCart(item));

    }

  };

  const { data: cart } = useQuery(
    {
      queryKey: ["cart"],
      queryFn: async () => {
        const res = await fetch("/api/cart",);
        return res.json()
      }
      // enabled: address && paymentMethod,
    }
  )
  const filterCart = cart?.length > 0 && cart?.filter((item) => item?.productId === Items?.productId);
  const isLoading = mutation.isLoading;



  // const num = Math.round(Items?.rating);
  // const rate = new Array(num).fill(0) || []
  // 

  const rate = [1, 2, 3].fill(0);
  const price = Items.price || Items?.product?.price;
  const totalPrice = Items?.qty * price || Items?.totalPrice;
  // const total=cartItems.reduce((acc,item)=>{
  //   return acc+Number(item.qty)*Number(item.price)
  // },0)
  // console.log("carBarItems", Items);

  return (
    <div className="flex gap-3 h-28 rounded px-1 mt-5 border-b-2  py-1">
      {
        Items?.images?.length > 0 && (
          <Image
            src={Items.images[0]?.url}
            alt={Items?.name}
            width={500}
            height={500}
            className="w-[30%] h-24 object-contain rounded-lg "
          />
        )
      }
      {
        Items?.product?.images?.length > 0 && (
          <Image
            src={Items?.product?.images[0]?.url}
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
        <Button
          size={"sm"}
          className="cursor-pointer bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border-2 font-semibold transition:all w-full"
          onClick={() => AddToCart(Items)}
        >
          {
            isLoading ? <Loader isLoading={isLoading} /> : <>Add to cart</>
          }
         

              <span>({Items?.quantity})</span>
         
        </Button>

        {/* <DeleteButton Items={Items}/> */}
      </div>
    </div>
  );
};

export default CartItems;
