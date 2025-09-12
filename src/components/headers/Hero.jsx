import React from "react";
import { Button } from "../../ui/button";
import Image from "next/image";
import Banner from "../../banner/Banner";
const Hero = () => {
  return (
    <>
      {/* <Banner /> */}
      <div className="w-full h-[40vh] md:h-[80vh] flex  justify-around  text-lg font-semibold  items-center relative   gap-3  ">
        {/* <div className="flex flex-col max-w-[400px] w-[300px] text-gray-700">
          <span className="flex gap-2 items-center">
            welcome to<b>JB</b>
            <b>SALE</b>!
          </span>
          <span>
            <b className="text-blue-600">SPECIAL </b>{" "}
            <b>
              OFFER UP TO <span className="text-green-600">30%</span> OFF
            </b>{" "}
          </span>
          <span>
            with your first <b className="text-yellow-500">PUCRCHASE</b>
          </span>
          <span>Get exclusive access to our new arrivals and sales</span>
          <div className="flex items-center gap-3">
            <Button variant={"primary"}>Shop Now</Button>
            <Button
              variant={"outline"}
              className=" cursor-pointer text-yellow-500 "
            >
              Explor More
            </Button>
          </div>
        </div> */}
        {/* Image */}
        <div className="w-full h-[40vh] md:h-[80vh] relative ">
          <Image
            src={"/shoe_banner1.jpg"}
            alt=""
            width={800}
            height={800}
            className="w-[100%] h-full "
          />
        </div>
        <div className="flex w-56 justify-between gap-3 items-center absolute bottom-10 left-2 md:left-16">
          <Button variant={"primary"} className={"text-xl cursor-pointer"}>
            Shop Now
          </Button>
          <Button
            variant={"outline"}
            className=" cursor-pointer text-xl text-yellow-500 "
          >
            Explor More
          </Button>
        </div>
      </div>
    </>
  );
};

export default Hero;
