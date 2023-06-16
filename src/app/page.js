"use client"

import React, { useState, useEffect } from "react"

import styles from "./styles/main.module.css"

import ImagePopup from "./components/imagePopup"
import Gallery from "./components/gallery"

import constructGallery from "./helpers/gridConstructor"
import importImages from "./helpers/importImages"
import zoomImage from "./helpers/zoomImage"

import texts from './data/mainTexts.json'
import pictures from "./data/content.json"

export default function Home() {

  const [ openPopup, setOpenPopup ] = useState(false)
  const [ imageOpened, setImageOpened ] = useState(null)
  const [ galleryWidth, setGalleryWidth ] = useState(1000)

  const images = importImages(pictures)
  const galleryLayout = constructGallery(images, 300, galleryWidth, 7)
  const adjustedImages = galleryLayout.flat(1)

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

  useEffect(() => {
    setGalleryWidth(window.innerWidth * .569)
  }, [])

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>
        {texts.title}
      </h2>
      <p className={styles.description}>
        {texts.description}
      </p>
      <Gallery
        galleryLayout={galleryLayout}
        maxGalleryWidth={galleryWidth}
        onOpenImage={openImage}
      />
      {
        openPopup && (
          <ImagePopup
            imageOpened={imageOpened}
            onSwitchImage={switchImage}
            onCloseImage={closeImage}
            onScreenClick={closeOnScreenClick}
          />
        )
      }
    </main>
  )
}
