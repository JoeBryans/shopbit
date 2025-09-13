import Link from "next/link";
import { Label } from "../ui/label";
import { Facebook, Instagram, LinkedinIcon, Twitter } from "lucide-react";
const Footer = () => {
  // bg-[#BA68C8]
  return (
    <div className=" bg-[#245A95] w-screen min-h-20 z-40  text-slate-50">
      <div className="max-w-[80rem]  w-[90%] flex flex-col mx-auto mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
          <div>
            <h4 className="text-2xl font-bold">ABOUT SHOPBITE </h4>
            <ul>
              <li>
                <Link href={""}>About Shopbite</Link>
              </li>
              <li>
                <Link href={""}>Blog</Link>
              </li>
              <li>
                <Link href={""}>Careers</Link>
              </li>
              <li>
                <Link href={""}>Forum</Link>
              </li>
              <li>
                <Link href={""}>Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-bold">BUYING ON SHOPBITE </h4>
            <ul>
              <li>
                <Link href={""}>Buyer Guide</Link>
              </li>
              <li>
                <Link href={""}>FAQ</Link>
              </li>
              <li>
                <Link href={""}>Delivery</Link>
              </li>
              <li>
                <Link href={""}>Retnur Policy</Link>
              </li>
              <li>
                <Link href={""}>Bunk Puchase</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-bold">LET US HELP YOU</h4>
            <ul>
              <li>
                <Link href={""}>Email: support@Shopbite.com</Link>
              </li>
              <li>
                <Link href={""}>Phone: +91-9876543210</Link>
              </li>
              <li>
                <Link href={""}>safe shopping</Link>
              </li>
              <li>
                <Link href={""}>Contact us</Link>
              </li>
            </ul>
          </div>

          <div>
            <Label
              htmlFor="email"
              className="flex items-center justify-between py-1  border-2  rounded-lg bg-white mb-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 w-[95%] max-w-[250px] text-muted-foreground border-0 focus:outline-0"
              />
              <button className="p-2 rounded-lg bg-blue-500 hover:bg-white text-white hover:text-blue-500 hover:border-blue-500 hover:border-2 font-semibold transition:all w-max">
                Subscribe
              </button>
            </Label>
            <ul className="flex gap-4 items-center">
              <li>
                <Link href={""}>
                  <Facebook size={30} />
                </Link>
              </li>
              <li>
                <Link href={""}>
                  <Instagram size={30} />
                </Link>
              </li>
              <li>
                <Link href={""}>
                  <Twitter size={30} />
                </Link>
              </li>
              <li>
                <Link href={""}>
                  <LinkedinIcon size={30} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
