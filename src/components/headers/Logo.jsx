import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex justify-between items-center max-w-[250px] w-[200px] ">
      <Link href={"/"} className="flex items-center gap-1 text-3xl font-bold ">
        <div className="flex items-center w-8 h-8 rounded-full bg-transparent justify-center border-2 border-yellow-500">
          <span className="font-bold text-xl text-blue-500 ">J</span>
          <span className="font-bold text-xl text-blue-500 ">B</span>
        </div>
        <span className="text-2xl font-bold">Mall</span>
      </Link>{" "}
    </div>
  );
}
