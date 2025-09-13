"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../ui/carousel"
import Image from "next/image"
const images = [
    "/71qcoYgEhzL._SX3000_.jpg",
    "/71xHyqBwdcL._SX3000_.jpg",
    "/81hIlE5xocL._SX3000_.jpg",
    "/619geyiQI5L._SX3000_.jpg",
    "/61Yx5-N155L._SX3000_.jpg",
]

export default function CardCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full relative place-items-center"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {images.map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1 w-full max-h-[100vh]">
                            <Image src={_} alt="product" width={1000} height={1000}
                                className="w-full object-cover rounded-md"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="absolute mx-auto w-[90%] bg-amber-400 top-[50%] flex justify-between items-center">

                <CarouselPrevious />
                <CarouselNext />

            </div>
        </Carousel>
    )
}