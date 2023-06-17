"use client"

import React from "react"
import dynamic from "next/dynamic"

import styles from "./styles/main.module.css"

import texts from './data/mainTexts.json'

export default function Home() {

  const Gallery = dynamic(
    () => {
      return import("./components/gallery")
    },
    { ssr: false }
  )

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>
        {texts.title}
      </h2>
      <p className={styles.description}>
        {texts.description}
      </p>
      <Gallery/>
    </main>
  )
}
