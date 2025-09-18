import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Summary from "./summary"

const paage = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) {
    redirect("/sign-in")
  }


  return (
    <div className='w-full   flex flex-col items-center '>
      <Summary />
    </div>
  )
}

export default paage