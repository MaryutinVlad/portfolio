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
  const [ imageOpened, setImageOpened] = useState(null)

  const openImage = (e) => {
    setOpenPopup(true)

    const imageToOpen = galleryLayout.find(item => e.target.alt === item.title)
    console.log(galleryLayout.find(row => row.find(item => e.target.alt === item.title)))
    setImageOpened(imageToOpen)
  }

  const closeImage = () => {
    setOpenPopup(false)
    setImageOpened(null)
  }

  const closeOnScreenClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpenPopup(false)
      setImageOpened(null)
    }
  }

  const importImage = (imported) => {
    const image = require(`../../../public/gallery/${imported.src}`).default
    return image
  }

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
                    onClick={openImage}
                  />
                </div>
              ))}
            </div>
          ))
        }
      </div>
      {
        openPopup && (
          <div
            className={styles.overlay}
            onClick={closeOnScreenClick}
          >
          <div className={styles.overlay_arrow}>
            <button type="button">
            </button>
          </div>
          
            {
              imageOpened && (
                <div>
                  <Image
                    src={`/gallery/${imageOpened.src}`}
                    alt={imageOpened.title}
                    width={imageOpened.adjustedWidth * 2}
                    height={imageOpened.adjustedHeight * 2}
                  />
                </div>
              )
              
            }
            <div className={styles.overlay_arrow}>
              <button type="button"></button>
            </div>
            <button
              className={styles.overlay_close}
              type="button"
              onClick={closeImage}
            >
            </button>
          </div>
        )
      }
    </main>
  )
}