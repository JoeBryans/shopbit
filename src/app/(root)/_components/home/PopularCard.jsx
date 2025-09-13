import { Card, CardContent } from '@/components/ui/card'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PopularCard = async () => {

  const res = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, {
  });
  const Latest = res?.data

  const productCard = [
    {
      id: 1,
      image: "/shoe.webp",
      name: "Male Shoes",
      price: "$30",
      discount: "-$5",
      rating: 4.5,
      review: "4.5/5 stars"
    },
    {
      id: 2,
      image: "/shirt.webp",
      name: "Male Shirt",
      price: "$49",
      discount: "-$2",
      rating: 4.5,
      review: "4.5/5 stars"
    },
    {
      id: 3,
      image: "/shirt2.webp",
      name: "T-Shirt for Men",
      price: "$10",
      discount: "-$1",
      rating: 4.5,
      review: "4.5/5 stars"
    },
    {
      id: 2,
      image: "/shirt.webp",
      name: "Male Shirt",
      price: "$49",
      discount: "-$2",
      rating: 4.5,
      review: "4.5/5 stars"
    },
    {
      id: 3,
      image: "/shirt2.webp",
      name: "T-Shirt for Men",
      price: "$10",
      discount: "-$1",
      rating: 4.5,
      review: "4.5/5 stars"
    },
    {
      id: 4,
      image: "/iphone.webp",
      name: "Apple iPhone 16 Pro Max",
      price: "$1200",
      discount: "-$20",
      rating: 4.5,
      review: "4.5/5 stars"


    },
    {
      id: 4,
      image: "/iphone.webp",
      name: "Apple iPhone 16 Pro Max",
      price: "$1200",
      discount: "-$20",
      rating: 4.5,
      review: "4.5/5 stars"


    },
    {
      id: 2,
      image: "/shirt.webp",
      name: "Male Shirt",
      price: "$49",
      discount: "-$2",
      rating: 4.5,
      review: "4.5/5 stars"
    },
    {
      id: 3,
      image: "/shirt2.webp",
      name: "T-Shirt for Men",
      price: "$10",
      discount: "-$1",
      rating: 4.5,
      review: "4.5/5 stars"
    },
    {
      id: 4,
      image: "/iphone.webp",
      name: "Apple iPhone 16 Pro Max",
      price: "$1200",
      discount: "-$20",
      rating: 4.5,
      review: "4.5/5 stars"


    },
    // {
    //   id:5,
    //   image:"/2460470.png",

    // }

  ]
  return (
    <div>
      <div className='text-gray-900 flex flex-col gap-10 '>
        {/* deals of the day */}
        <Card className={"max-w-5xl bg-white w-max mx-auto overflow-x-auto scrollbar-hide"}>
          <h1 className='ml-4 text-lg font-semibold '>Deals of the Day</h1>
          <Link href="/" className="flex gap-1 mx-auto  px-4  overflow-auto scrollbar-hide">

            {productCard.slice(0, 1).map((product) => {
              return (
                <CardContent key={product.id}
                  className={"w-80 max-h-60 flex flex-col items-start py-2 px-1 "}
                >
                  <div className='w-full'>
                    <Image src={product.image} alt={product.name} width={100} height={100}
                      className='w-full h-52 object-cover'
                    />

                  </div>
                </CardContent>

              )
            }



            )}
          </Link>
        </Card>
        {/* latest products */}
        <div className='w-full bg-white rounded-2xl pt-2 '> <h1 className='ml-4 text-lg font-semibold md:ml-10 '>Latest Products from Popular Brands</h1>
          <Card className={"w-full bg-white overflow-x-auto scrollbar-hide"}>
            <div className="flex gap-1 mx-auto  px-4  overflow-auto scrollbar-hide">

              {Latest.length > 0 && (Latest?.map((product) => {
                return (
                  <CardContent key={product.id}
                    className={"w-48 flex flex-col items-start py-2 px-1 "}
                  >
                    <Link href={`/product/category/${encodeURI(product.category.name)}`} className='w-full'>
                      <Image src={product?.images[0]?.url} alt={product?.name} width={100} height={100}
                        className='w-full h-44 object-cover'
                      />

                    </Link >
                  </CardContent>

                )
              }



              ))}
            </div>
          </Card>
        </div>

        {/* best sellers in computers & accessories */}
        {/* <Card className={"w-full overflow-x-auto scrollbar-hide"}>
          <h1 className='ml-4 text-lg font-semibold '>Best Sellers in Computers & Accessories</h1>
          <Link href="/" className="flex gap-1 mx-auto  px-4  overflow-auto scrollbar-hide">

            {productCard.map((product) => {
              return (
                <CardContent key={product.id}
                  className={"w-48 flex flex-col items-start py-2 px-1 "}
                >
                  <div className='w-full'>
                    <Image src={product.image} alt={product.name} width={100} height={100}
                      className='w-full h-44 object-cover'
                    />

                  </div>
                </CardContent>

              )
            }



            )}
          </Link>
        </Card> */}
        {/* Best Sellers in Clothing, Shoes & Jewelry*/}
        {/* <Card className={"w-full overflow-x-auto scrollbar-hide"}>
          <h1 className='ml-4 text-lg font-semibold '>Best Sellers in Clothing, Shoes & Jewelry</h1>
          <Link href="/" className="flex gap-1 mx-auto  px-4  overflow-auto scrollbar-hide">

            {productCard.map((product) => {
              return (
                <CardContent key={product.id}
                  className={"w-48 flex flex-col items-start py-2 px-1 "}
                >
                  <div className='w-full'>
                    <Image src={product.image} alt={product.name} width={100} height={100}
                      className='w-full h-44 object-cover'
                    />

                  </div>
                </CardContent>

              )
            }



            )}
          </Link>
        </Card> */}

        {/* Best Sellers in Electronics & Appliances */}
        {/* <Card className={"w-full overflow-x-auto scrollbar-hide"}>
          <h1 className='ml-4 text-lg font-semibold '>Best Sellers in Electronics & Appliances</h1>
          <Link href="/" className="flex gap-1 mx-auto  px-4  overflow-auto scrollbar-hide">

            {productCard.map((product) => {
              return (
                <CardContent key={product.id}
                  className={"w-48 flex flex-col items-start py-2 px-1 "}
                >
                  <div className='w-full'>
                    <Image src={product.image} alt={product.name} width={100} height={100}
                      className='w-full h-44 object-cover'
                    />

                  </div>
                </CardContent>

              )
            }



            )}
          </Link>
        </Card> */}

        {/* Best Sellers in Home & Kitchen */}
        {/* <Card className={"w-full overflow-x-auto scrollbar-hide"}>
          <h1 className='ml-4 text-lg font-semibold '>Best Sellers in Home & Kitchen</h1>
          <Link href="/" className="flex gap-1 mx-auto  px-4  overflow-auto scrollbar-hide">

            {productCard.map((product) => {
              return (
                <CardContent key={product.id}
                  className={"w-48 flex flex-col items-start py-2 px-1 "}
                >
                  <div className='w-full'>
                    <Image src={product.image} alt={product.name} width={100} height={100}
                      className='w-full h-44 object-cover'
                    />

                  </div>
                </CardContent>

              )
            }



            )}
          </Link>
        </Card> */}

        {/* best sellers in phones & accessories */}
        {/* <Card className={"w-full overflow-x-auto scrollbar-hide"}>
          <h1 className='ml-4 text-lg font-semibold '>Best Sellers in Phones & Accessories</h1>
          <Link href="/" className="flex gap-1 mx-auto  px-4  overflow-auto scrollbar-hide">

            {productCard.map((product) => {
              return (
                <CardContent key={product.id}
                  className={"w-48 flex flex-col items-start py-2 px-1 "}
                >
                  <div className='w-full'>
                    <Image src={product.image} alt={product.name} width={100} height={100}
                      className='w-full h-44 object-cover'
                    />

                  </div>
                </CardContent>

              )
            }



            )}
          </Link>
        </Card> */}
        {/* Best Sellers in Grocery & Gourmet Food */}
        {/* <Card className={"w-full overflow-x-auto scrollbar-hide"}>
          <h1 className='ml-4 text-lg font-semibold '>Best Sellers in Grocery & Gourmet Food</h1>
          <Link href="/" className="flex gap-1 mx-auto  px-4  overflow-auto scrollbar-hide">

            {productCard.map((product) => {
              return (
                <CardContent key={product.id}
                  className={"w-48 flex flex-col items-start py-2 px-1 "}
                >
                  <div className='w-full'>
                    <Image src={product.image} alt={product.name} width={100} height={100}
                      className='w-full h-44 object-cover'
                    />

                  </div>
                </CardContent>

              )
            }



            )}
          </Link>
        </Card> */}
        {/* Best Sellers in Beauty & Personal Care */}
        {/* <Card className={"w-full overflow-x-auto scrollbar-hide"}>
          <h1 className='ml-4 text-lg font-semibold '>Best Sellers in Beauty & Personal Care</h1>
          <Link href="/" className="flex gap-1 mx-auto  px-4  overflow-auto scrollbar-hide">

            {productCard.map((product) => {
              return (
                <CardContent key={product.id}
                  className={"w-48 flex flex-col items-start py-2 px-1 "}
                >
                  <div className='w-full'>
                    <Image src={product.image} alt={product.name} width={100} height={100}
                      className='w-full h-44 object-cover'
                    />

                  </div>
                </CardContent>

              )
            }



            )}
          </Link>
        </Card> */}

      </div>
    </div>
  )
}

export default PopularCard