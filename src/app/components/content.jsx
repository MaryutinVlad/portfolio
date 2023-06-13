"use client"

import React, { useState } from "react"

import styles from "../styles/main.module.css"
import constructGrid from "../helpers/gridConstructor"
import overlayData from "../data/overlay.json"
import texts from '../data/mainTexts.json'
import pictures from "../data/content.json"

import Image from "next/image"

export default function Content() {

  let maxGalleryWidth = 1000
  const galleryLayout = constructGrid(pictures, 300, 1000, 7)
  const [ openPopup, setOpenPopup ] = useState(false)

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>
        {texts.title}
      </h2>
      <p className={styles.description}>
        {texts.description}
      </p>
      <div
        className={styles.gallery}
        style={{ width: `${maxGalleryWidth}px`}}
      >
        {
          galleryLayout.map((row, index) => (
            <div
              key={row + '' + index}
            >
              {row.map(item => (
                <div
                  key={item.title}
                  //style={{ backgroundColor: `${overlayData.colors[Math.floor(Math.random() * (overlayData.colors.length - 1))]}`}}
                >
                  <Image
                    src={`/gallery/${item.src}`}
                    width={item.adjustedWidth}
                    height={item.columnHeight}
                    alt={item.title}
                  />
                </div>
              ))}
            </div>
          ))
        }
      </div>
    </main>
  )
}