'use client'

import { useRouter } from "next/navigation";

import NavigationLink from "./navigation-link";
import IconButton from "./icon-button"

import data from "../data/header.json"

import { header, navigation, buttons } from "../styles/header.module.css"

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
      <div className={buttons}>
        {data.icons.map(({title, size}) => 
          <IconButton
            key={title}
            title={title}
            size={size}
          />
        )}
      </div>
    </header>
  )
}