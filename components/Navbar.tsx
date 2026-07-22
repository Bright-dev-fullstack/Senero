"use client"
import Image from "next/image";
import Link from "next/link";
import { Theme } from "./Theme";
import { AiOutlineMenu } from "react-icons/ai";
import { RiCloseLargeLine } from "react-icons/ri";
import { useId, useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { signOut } from "next-auth/react";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";

interface navItems{
    name:string,
    url:string,
}

export default function Navbar(){
    const {data: session}= useSession()
      const id = useId();
    const buttonId = `${id}-button`;
    const menuId = `${id}-menu`;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const[navOpen,setNavOpen] = useState(false)
    const navItems: navItems[] = [
        {
            name: "Home",
            url: "/"
        },
        {
            name: "About",
            url: "/about"
        },
        {
            name: "Find Jobs",
            url: "/jobs"
        },
        {
            name: "Post Job",
            url: "/post"
        },
        ...(!session  ? [{ name: "Signin", url: "/signin", }]: []  )
    ]
    return(
        <main className="flex items-center justify-between shadow-md py-2 max-md:px-3 md:px-7 bg-white sticky top-0 z-50">
            <div >
                <Link href={"/"} className="flex gap-0.5 items-center z-50">
                    <Image
                    src={"/logo.png"}
                    alt="tasker logo"
                    width={500}
                    height={500}
                    className="w-8 h-8"
                    />
                     <p className="font-semibold font-xl text-emerald-400">Sereno</p>
                </Link>
            </div>
            <div className="flex gap-4 items-center">
                {
                    navItems.map((items,index)=>
                 <div key={index} className="px-1 group max-md:hidden">
                    <Link style={{color:Theme.darkgreen}} href={items.url}>{items.name}</Link>
                    <div style={{backgroundColor:Theme.lightGreen}} className=" h-0.5 opacity-0 group-hover:opacity-100"></div>
                </div>
                    )
                }
                {/* mobile view */}
                        {
                session? (
                    <div>
      <button
        id={buttonId}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleClick}
      >
        <Avatar alt={session?.user?.name || "User"} src={session?.user?.image || ""} />
      </button>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': buttonId,
          },
        }}
      >
        <MenuItem onClick={handleClose}>
            <Link href={"/profile"}>Profile</Link>
        </MenuItem>
        {/* <MenuItem onClick={handleClose}> */}
            {/* <Link href={"/setting"}>Settings</Link> */}
        {/* </MenuItem> */}
        <MenuItem onClick={handleClose}>
            <button onClick={() => signOut()}>Sign Out</button>
        </MenuItem>
      </Menu>
    </div>
                ): (
                    <div></div>
                )
            }
                 <div className={`h-dvh bg-gray-300 absolute w-full top-0 left-0 pt-20 items-center flex-col gap-7 md:hidden ${navOpen? "flex": "hidden"}`}>
                        
                {
                    navItems.map((items,index)=>
                 <div key={index} className="px-1 group lg:hidden">
                    <Link onClick={()=> setNavOpen(false)} style={{color:Theme.darkgreen}} href={items.url}>{items.name}</Link>
                    <div style={{backgroundColor:Theme.lightGreen}} className=" h-0.5 opacity-0 group-hover:opacity-100"></div>
                </div>
                    )
                }
                </div>

                <button onClick={()=>setNavOpen(!navOpen)} className="md:hidden z-50 text-2xl">
                    {
                        navOpen?   <RiCloseLargeLine /> :  <AiOutlineMenu />
                    }
                </button>
            </div>
        </main>
    )
}