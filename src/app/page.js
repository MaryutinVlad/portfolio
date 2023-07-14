"use client"

import dynamic from "next/dynamic"

import styles from "./styles/home.module.css"

import texts from './data/mainTexts.json'
import imagesData from "./data/gallery.json"

import importImages from "./helpers/importImages"

export default function Home() {

  const images = importImages(imagesData, true, 4)

  const Gallery = dynamic(
    () => {
      return import("./components/Images")
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
      <Gallery
        images={images}
        rowHeight={300}
        widthFactor={1}
      />
    </main>
  )
}
