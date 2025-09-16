"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as FaIcons from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Loader from "./Loader";
;
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

const schema = yup.object({
  name: yup.string().min(3).required({ message: "Name is required" }),
  email: yup.string().min(3).required({ message: "Email is required" }),
  phone: yup.string().min(10).required({ message: "Phone is required" }),
  role: yup.string(),
  password: yup
    .string()
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least  one number ")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    )
    .min(10, "Password must contain at least 10 characters"),
});
// .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
//       "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
//     )
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/imageKit");
    console.log(response);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    console.log(data);

    const { signature, expire, token } = data;
    // const expireTime = Math.floor(Date.now() / 1000) + 3600;
    // console.log(expireTime);

    // const expire.setTime(expireTime);
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const SignUp = () => {
  const imageRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccuss, setIsSuccuss] = useState(false);
  const [image, setImage] = useState(null);
  const criterial = [
    { regEx: /.[10]/, message: "Password must contain at least 10 characters" },

    {
      regEx: /[A-Z]/,
      message: "Password must contain at least one uppercase letter",
    },
    {
      regEx: /[a-z]/,
      message: "Password must contain at least one lowercase letter",
    },
    { regEx: /[0-9]/, message: "Password must contain at least one number" },
    {
      regEx: /[@$!%*?&]/,
      message: "Password must contain at least one special character",
    },
  ];
  console.log(image);

  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const password = watch("password", "");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(data),
      });
      const datas = await res.json();
      if (!res?.ok) {
        toast.error(datas?.message);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.success("user created successfully");
        setIsSuccuss(true);
        router.push("/sign-in");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };
  const handleError = (error) => {
    console.log(error.message);
    toast.error(error.message);
  };
  const handleSuccess = (res) => {
    toast.success("Uploaded successfully");
    setImage(res.url);
  };
  const handleStart = (res) => {
    console.log(res);
  };
  const handleEnd = (res) => {
    console.log(res);
  };
  return (
    <>

      <Card className=" max-w-[600px] w-[90%] h-max text-slate-800">
        <CardHeader className="w-full flex items-center justify-center">
          <span className="text-2xl font-semibold">Create Account</span>
        </CardHeader>
        <CardContent className=" flex flex-col items-start p-3 mx-auto ">
          {!isSuccuss ? (
            <form className=" block mx-auto" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex w-full  px-3 gap-3 items-center justify-center mb-3 ">
                <Button
                  type="button"
                  className=" bg-red-700 text-white  font-semibold  w-max"
                >
                  <FaIcons.FaGoogle size={20} />
                  <span className="hidden md:block">Google</span>
                </Button>
                <Button
                  type="button"
                  className=" bg-black text-white  font-semibold  w-max"
                >
                  <FaIcons.FaAmazon size={20} />
                  <span className="hidden md:block">Amazon</span>
                </Button>
                <Button
                  type="button"
                  className=" bg-emerald-700 text-white  font-semibold  w-max"
                >
                  <FaIcons.FaSpotify size={20} />
                  <span className="hidden md:block">Spotify</span>
                </Button>
                <Button
                  type="button"
                  className=" bg-black text-white  font-semibold  w-max"
                >
                  <FaIcons.FaGithub size={20} />
                  <span className="hidden md:block">Github</span>
                </Button>
              </div>
              <Label
                htmlFor="name"
                className="flex flex-col gap-3 items-start px-3 py-1 w-full "
              >
                <span>FullName</span>
                <Input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="focuse:outline-0 fucous:border-0 border-2 rounded-lg py-2"
                />
                {errors.name && (
                  <span className="text-rose-500 text-xs">
                    {errors.name.message}
                  </span>
                )}
              </Label>
              <Label
                htmlFor="email"
                className="flex flex-col gap-3 items-start px-3 py-1 w-full "
              >
                <span>Email</span>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="focuse:outline-0 fucous:border-0 border-2 rounded-lg py-2"
                />
                {errors.email && (
                  <span className="text-rose-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </Label>
              <Label
                htmlFor="phone"
                className="flex flex-col gap-3 items-start px-3 py-1 w-full "
              >
                <span>Phone</span>
                <Input
                  id="phone"
                  {...register("phone")}
                  type="text"
                  className="focuse:outline-0 fucous:border-0 border-2 rounded-lg py-2"
                />
                {errors.phone && (
                  <span className="text-rose-500 text-xs">
                    {errors.phone.message}
                  </span>
                )}
              </Label>

              <Label
                htmlFor="password"
                className="flex flex-col gap-3 items-start px-3 py-1 w-full "
              >
                <span>Password</span>
                <Input
                  id="password"
                  {...register("password")}
                  type="password"
                  className="focuse:outline-0 fucous:border-0 border-2 rounded-lg py-2"
                />
              </Label>
              <div className="w-full mt-3 px-5 ">
                {criterial.map((items, i) => (
                  <div className={"flex items-center gap-3"}>
                    <Input
                      type={"checkbox"}
                      checked={items.regEx.test(password)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded-md"
                    />
                    <span
                      className={`${items.regEx.test(password)
                        ? "text-green-600 "
                        : "text-red-600"
                        } `}
                    >
                      {items.message}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3 items-start px-3 py-1 w-full mt-2 mb-2">
                <Button
                  Button
                  disabled={isLoading && isLoading}
                  variant={"primary"}
                // className="p-2 rounded-lg text-white bg-blue-600 hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border-2 font-semibold transition:all w-full px-3 cursor-pointer "
                >
                  {isLoading ? <Loader isLoading={isLoading} /> : "sign up"}
                </Button>
                <span>
                  Alread have an account with Shopbite ?{" "}
                  <Link
                    href={"/sign-in"}
                    className="font-semibold hover:underline text-blue-500"
                  >
                    sign in
                  </Link>
                </span>
              </div>
            </form>
          ) : // <div className="flex flex-col items-center justify-center">
            //   <Card>
            //     <CardHeader>
            //       <span>Add profile picture</span>
            //     </CardHeader>
            //     {/* <Image
            //     src="https://images.unsplash.com/photo-1683277384437-d2c2e1e4b4f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            //     alt="profile"
            //     width={200}
            //     height={200}
            //     className="rounded-full"
            //   /> */}
            //     <UploadButton
            //       endpoint="imageUploader"
            //       className="flex items-center w-full rounded-2xl  bg-black/40 shadow-md h-fit py-1 cursor-pointer font-semibold  "
            //       onClientUploadComplete={(res) => {
            //         if (res) {
            //           setFiles(res);
            //         }

            //         alert("Upload Completed");
            //       }}
            //       onUploadError={(error) => {
            //         alert(`ERROR! ${error.message}`);
            //       }}
            //     />
            //     <CardContent>
            //       <button className="p-2 rounded-lg text-white bg-blue-600 hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border-2 font-semibold transition:all w-max px-3">
            //         {isLoading ? <Loader isLoading={isLoading} /> : "sign up"}
            //       </button>
            //     </CardContent>
            //   </Card>
            // </div>
            null}
        </CardContent>
      </Card>
    </>
  );
};

export default SignUp;
