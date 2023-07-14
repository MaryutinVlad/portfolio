"use client"

import { usePathname } from "next/navigation"

import Link from "next/link"

import { link, divider, link_active } from "../styles/header.module.css"

export default function NavigationLink({
  title,
  path
}) {

  const pathname = usePathname()

  return (
    <>
      <div className={`${link} ${pathname === path && link_active}`}>
        <Link
          href={path}
        >
          {title}
        </Link>
        <hr
          style={{
            width: pathname === path && '100%',
            borderColor: pathname === path && 'black'
        }}
        />
      </div>
      <hr className={divider}/>
    </>
  )
}