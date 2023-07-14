"use client"

import { footer } from "../styles/footer.module.css"

import ShareButtons from "./ShareButtons"

export default function Footer() {

  const toTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className={footer}>
      <ShareButtons
        size={[20, 24]}
        gap={20}
      />
      <h3 onClick={toTop}>
        Header alley
      </h3>
      <span>
        2023
      </span>
    </footer>
  )
}