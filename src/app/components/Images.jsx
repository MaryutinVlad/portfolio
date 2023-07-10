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
  const [ prevImage, setPrevImage ] = useState(null)
  const [ currentImage, setCurrentImage ] = useState(null)
  const [ nextImage, setNextImage ] = useState(null)
  const [ hasContent, setHasContent ] = useState(false)
  const [ windowWidth, setwindowWidth ] = useState(window.innerWidth)

  const galleryLayout = constructGallery(images, rowHeight, windowWidth * widthFactor, 7)
  const adjustedImages = galleryLayout.flat(1)

  window.addEventListener('resize', () => {
    setwindowWidth(window.innerWidth)
  })

  const openImages = ({ target }) => {

    const { alt } = target
    const currentImageIndex = images.findIndex(item => alt === item.title)
    const nextImageIndex = (currentImageIndex + 1) % images.length
    let prevImageIndex = (currentImageIndex - 1) % images.length

    if (prevImageIndex < 0) {
      prevImageIndex = images.length - 1
    }

    setOpenPopup(true)
    setPrevImage(zoomImage(adjustedImages[prevImageIndex]))
    setCurrentImage(zoomImage(adjustedImages[currentImageIndex]))
    setNextImage(zoomImage(adjustedImages[nextImageIndex]))
    setHasContent(true)
  }

  const switchImage = (toNext) => {

    if (toNext) {

      const nextImageIndex = (adjustedImages.findIndex(item => nextImage.title === item.title) + 1) % images.length
      
      setPrevImage(currentImage)
      setCurrentImage(nextImage)
      setNextImage(zoomImage(adjustedImages[nextImageIndex]))

      return
    }

    let prevImageIndex = (adjustedImages.findIndex(item => prevImage.title === item.title) - 1) % images.length

    if (prevImageIndex < 0) {
      prevImageIndex = images.length - 1
    }

    setPrevImage(zoomImage(adjustedImages[prevImageIndex]))
    setCurrentImage(prevImage)
    setNextImage(currentImage)

    /*let imageToOpen = (adjustedImages.findIndex(item => imageOpened.title === item.title) + toNext) % images.length
    
    if (imageToOpen < 0) {
      imageToOpen = images.length - 1
    }
    
    setImageOpened(zoomImage(adjustedImages[imageToOpen]))*/
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
                  onClick={openImages}
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
                  prevImage={prevImage}
                  currentImage={currentImage}
                  nextImage={nextImage}
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