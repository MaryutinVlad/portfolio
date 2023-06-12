"use client"

import { usePathname } from "next/navigation"

import Link from "next/link"

export default function NavigationLink({
  title,
  path
}) {

  const pathname = usePathname()

  return (
    <Link
      href={path}
      style={{ color: pathname === path && 'red'}}
    >
      {title}
    </Link>
  )
}