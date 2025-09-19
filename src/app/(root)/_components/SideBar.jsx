import { Sidebar, SidebarContent, SidebarHeader, SidebarMenuButton } from '../../../components/ui/sidebar'
import Link from 'next/link'
import React from 'react'

const SideBar = async () => {
    const category = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category`)
    const data = await category.json()
    console.log(data)

    return (
        <Sidebar className={"max-w-xs w-full"}>
            <SidebarHeader className={"w-full"}>
                <h1 className='text-xl text-center font-semibold text-gray-700 mt-4 mb-1 border-b-1'>
                    Categories
                </h1>
            </SidebarHeader>
            <SidebarContent className={"w-full p-4 "}>
                <div className='flex flex-col gap-3 mx-auto'>
                    {data.map((item, index) => {
                        return (
                            <Link key={index} href={`/product/category?category=${encodeURI(item.slug)}`}
                                className='flex items-center  text-gray-700 hover:bg-gray-200 cursor-pointer transition-all  p-1.5 rounded-lg text-center capitalize'
                            >
                                {item.name}
                            </Link>
                        )
                    })}
                </div>
            </SidebarContent>
        </Sidebar>
    )

}

export default SideBar