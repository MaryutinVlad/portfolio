"use client"

import Image from "next/image"

import React, { useState } from "react"
import styles from "../styles/gallery.module.css"

import ImagePopup from "./imagePopup"

import constructGallery from "../helpers/constructGallery"
import zoomImage from "../helpers/zoomImage"

export default function Gallery({
  images,
  rowHeight,
  widthFactor
}) {

  const [ openPopup, setOpenPopup ] = useState(false)
  const [ imageOpened, setImageOpened ] = useState(null)

  const galleryLayout = constructGallery(images, rowHeight, window.innerWidth * widthFactor, 7)
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

  console.log(galleryLayout)

  return (
    <div
        className={styles.gallery}
        style={{ width: `${window.innerWidth * widthFactor}px`}}
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
                  width={0}
                  height={0}
                  alt={item.title}
                  onClick={openImage}
                  style={{ width: item.relativeWidth, height: 'auto' }}
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