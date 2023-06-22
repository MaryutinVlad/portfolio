'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

import NavigationLink from "./NavigationLink";
import ShareButtons from "./ShareButtons";
import Share from "./SharePopup"

import data from "../data/header.json"

import { header, navigation } from "../styles/header.module.css"

export default function Header(){

  const [ isPopupOpened, setIsPopupOpened ] = useState(false)

  const router = useRouter()

  const toHomePage = () => router.push('/')
  const openPopup = () => {
    setIsPopupOpened(true)
  }

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
      <Share isOpened={isPopupOpened}/>
    </header>
  )
}