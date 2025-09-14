import { Sidebar, SidebarContent, SidebarHeader, SidebarMenuButton } from './ui/sidebar'
import Link from 'next/link'
import React from 'react'

const SideBar = async () => {
    const category = await fetch('http://localhost:3000/api/category')
    const data = await category.json()
    console.log(data)

    return (
        <div>
            <Sidebar>
                <SidebarContent>
                    <SidebarHeader>
                        <SidebarMenuButton>
                            Categories
                        </SidebarMenuButton>
                    </SidebarHeader>
                    <div>
                        {data.map((item, index) => {
                            return (
                                <Link key={index} href={`/product/category?category=${encodeURI(item.slug)}`}>
                                    <SidebarMenuButton>
                                        {item.name}
                                    </SidebarMenuButton>
                                </Link>
                            )
                        })}
                    </div>
                </SidebarContent>
            </Sidebar>
        </div>
    )
   
}

export default SideBar