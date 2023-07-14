"use client"

import Image from "next/image"

import React, { useState } from "react"
import styles from "../styles/images.module.css"

import ImagePopup from "./ImagePopup"

import constructGallery from "../helpers/constructGallery"
import zoomImage from "../helpers/zoomImage"

export default function Images({
  images,
  rowHeight,
  widthFactor
}) {

  const [ openPopup, setOpenPopup ] = useState(false)
  const [ currentImage, setCurrentImage ] = useState(null)
  const [ hasContent, setHasContent ] = useState(false)
  const [ windowWidth, setwindowWidth ] = useState(window.innerWidth)

  const galleryLayout = constructGallery(images, rowHeight, windowWidth * widthFactor, 7)
  const adjustedImages = galleryLayout.flat(1)

  window.addEventListener('resize', () => {
    setwindowWidth(window.innerWidth)
  })

  const openImage = ({ target }) => {

    const { alt } = target
    const currentImageIndex = images.findIndex(item => alt === item.title)

    setCurrentImage(zoomImage(adjustedImages[currentImageIndex]))
    setOpenPopup(true)
    setHasContent(true)
  }

  const switchImage = (direction) => {

    let imageToOpenIndex = (adjustedImages.findIndex(item => currentImage.title === item.title) + direction) % images.length

    if (imageToOpenIndex < 0) {
      imageToOpenIndex = images.length - 1
    } 

    setCurrentImage(zoomImage(adjustedImages[imageToOpenIndex]))
  }

  const closeImage = () => {
    setOpenPopup(false)
    setCurrentImage(null)
  }

  const closeImageOnButton = () => {
    setHasContent(false)
    setTimeout(closeImage, 250)
  }

  const closeOnScreenClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      setHasContent(false)
      setTimeout(closeImage, 250)
    }
  }

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
          <div style={hasContent ? { opacity: '1', transition: 'opacity .25s ease-in'} : {opacity: '0', transition: 'opacity .25s linear'}}>
            {
              openPopup && (
                <ImagePopup
                  currentImage={currentImage}
                  onSwitchImage={switchImage}
                  onCloseImage={closeImageOnButton}
                  onScreenClick={closeOnScreenClick}
                />
              )
            }
        </div>
      </div>
  )
}