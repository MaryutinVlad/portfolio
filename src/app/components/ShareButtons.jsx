"use client"

import Image from "next/image"

import SharePopup from "./SharePopup"

import { useState } from "react"

import { buttons } from "../styles/header.module.css"

export default function ShareButtons({
  size,
  gap
}) {

  const [ isPopupOpen, setIsPopupOpen ] = useState(false)

  const openPopup = () => {
    setIsPopupOpen(true)
  }

  return (
    <>
      <div
        className={buttons}
        style={{ gap: `${gap}px`}}
      >
        <Image
          width={size[0]}
          height={size[0]}
          src="/icons/share.svg"
          alt="share"
          onClick={openPopup}
        />
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a"
          target="_blank"
        >
          <Image
            width={size[1]}
            height={size[1]}
            src="/icons/instagram.svg"
            alt="instagram"
          />
        </a>
      </div>
      { isPopupOpen && (
        <SharePopup />
      )}
    </>
  )
}