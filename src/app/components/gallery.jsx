"use client"

import Image from "next/image"

import React, { useState } from "react"
import styles from "../styles/gallery.module.css"

import ImagePopup from "./imagePopup"

import imagesData from "../data/gallery.json"

import importImages from "../helpers/importImages"
import constructGallery from "../helpers/constructGallery"
import zoomImage from "../helpers/zoomImage"

export default function Gallery() {

  const [ openPopup, setOpenPopup ] = useState(false)
  const [ imageOpened, setImageOpened ] = useState(null)

  const images = importImages(imagesData, true, 2)
  const galleryLayout = constructGallery(images, 300, window.innerWidth * .578, 7)
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

  return (
    <div
        className={styles.gallery}
        style={{ width: `${window.innerWidth * .578}px`}}
      >
        {
          galleryLayout.map((row, index) => (
            <div
              key={row + '' + index}
              className={styles.row}
            >
              {row.map(item => (
                <Image
                  key={item.title}
                  className={styles.image}
                  src={item.src}
                  width={item.adjustedWidth}
                  height={item.columnHeight}
                  alt={item.title}
                  onClick={openImage}
                />
              ))}
            </div>
          ))
        }
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
      </div>
  )
}