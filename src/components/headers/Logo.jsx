import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex justify-between items-center max-w-[250px] w-[200px] ">
      <Link href={"/"} className="flex items-center gap-0 text-3xl font-bold ">
        
        <span className="text-2xl font-bold">Shop.</span>
        <span className="mt-3 text-sm italic">bite</span>
      </Link>{" "}
    </div>
  );
}
