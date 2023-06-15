"use client"

import React, { useState } from "react"

import styles from "../styles/main.module.css"

import constructGrid from "../helpers/gridConstructor"
import imageImporter from "../helpers/imageImporter"
import zoomImage from "../helpers/zoomImage"

import overlayData from "../data/overlay.json"
import texts from '../data/mainTexts.json'
import pictures from "../data/content.json"

import Image from "next/image"

export default function Content() {

  let maxGalleryWidth = 1000

  const images = imageImporter(pictures)
  const galleryLayout = constructGrid(images, 300, 1000, 7)
  const adjustedImages = galleryLayout.flat(1)
  const [ openPopup, setOpenPopup ] = useState(false)
  const [ imageOpened, setImageOpened] = useState(null)

  const openImage = (e) => {
    setOpenPopup(true)
    const imageToOpen = images.findIndex(item => e.target.alt === item.title)
    setImageOpened(zoomImage(adjustedImages[imageToOpen], window.innerHeight * .8))
  }

  function switchImage(direction) {
    let imageToOpen = (adjustedImages.findIndex(item => imageOpened.alt === item.title) + direction) % images.length
    if (imageToOpen < 0) {
      imageToOpen = images.length - 1
    }
    setImageOpened(zoomImage(adjustedImages[imageToOpen], window.innerHeight * .8))
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
                    src={item.src}
                    width={item.adjustedWidth}
                    height={item.columnHeight}
                    alt={item.title}
                    onClick={openImage}
                    placeholder="blur"
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
          <div className={styles.overlay_arrow} onClick={() => switchImage(-1)}>
            <button type="button">
            </button>
          </div>
          
            {
              imageOpened && (
                <div>
                  <Image
                    src={imageOpened.src}
                    alt={imageOpened.alt}
                    width={imageOpened.width}
                    height={imageOpened.height}
                  />
                </div>
              )
              
            }
            <div className={styles.overlay_arrow} onClick={() => switchImage(1)}>
              <button type="button">
              </button>
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