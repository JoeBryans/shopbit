import Hero from "@/components/headers/Hero/Hero";
import PopularCard from "./(root)/_components/home/PopularCard";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full min-h-screen ">
   <div className="w-full relative">
    <Hero/>
   </div>
   <main className=" w-full max-w-8xl mx-auto px-3 md:px-6  my-10">
        <Suspense fallback={<div>Loading...</div>}>
          {/* <PopularCard /> */}

        </Suspense>
   </main>
 
    </div>
  );
}
