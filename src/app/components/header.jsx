'use client'

import { useRouter } from "next/navigation"

import NavigationLink from "./NavigationLink"
import ShareButtons from "./ShareButtons"

import data from "../data/header.json"

import { header, navigation } from "../styles/header.module.css"

export default function Header(){

  const router = useRouter()

  const toHomePage = () => router.push('/')

  return (
    <header className={header}>
      <h1 onClick={toHomePage}>
        Header Alley
      </h1>
      <nav className={navigation}>
        {data.links.map(({title, path}) => 
          <NavigationLink
            key={title}
            title={title}
            path={path}
          />
        )}
      </nav>
      <ShareButtons
        size={[30, 37]}
        gap={20}
      />
    </header>
  )
}