import Image from "next/image"

import styles from "../styles/imagePopup.module.css"

import { useState } from "react"

export default function ImagePopup({
  currentImage,
  onSwitchImage,
  onCloseImage,
  onScreenClick
}) {

  const [ isLoaded, setIsLoaded ] = useState(false)
  const [ toNextImage, setToNextImage ] = useState(true)

  let touchStartX = 0

  function closeImage() {
    setIsLoaded(false)
    setToNextImage(true)
    onCloseImage()
  }

  function switchImage(direction) {
    setToNextImage(direction > 0 ? true : false)
    setIsLoaded(false)
    onSwitchImage(direction)
  }

  function closeOnScreenClick(e) {
    onScreenClick(e)
    if (e.target === e.currentTarget) {
      setIsLoaded(false)
      setToNextImage(true)
    }
  }

  function onStartTouch(e) {
    touchStartX = e.touches[0].clientX
  }

  function onEndTouch(e) {
    const touchEndX = e.changedTouches[0].clientX

    if (Math.abs(touchStartX - touchEndX) >= 150) {

      if (touchStartX < touchEndX) {
        return switchImage(1)
      }

      switchImage(-1)
    }
  }

  return (
    <div
      className={styles.overlay}
      onClick={closeOnScreenClick}
      onTouchStart={onStartTouch}
      onTouchEnd={onEndTouch}
    >
      <div
        className={styles.overlay_arrow}
        onClick={() => switchImage(-1)}
      >
        <button type="button"></button>
      </div>   
      <div className={styles.content}>
        <Image
          id="openedImage"
          className={isLoaded ? styles.content_image_loaded : (
            toNextImage ? styles.content_image_next : styles.content_image_prev
          )}
          src={currentImage.src}
          alt={currentImage.title}
          width={currentImage.width}
          onLoadingComplete={() => setTimeout(() => setIsLoaded(true), 500)}
        />
        <p
          style={{ width: `${currentImage.width}px` }}
          className={styles.content_text}
        >
          {currentImage.description}
        </p>
      </div>
      <div
        className={styles.overlay_arrow}
        onClick={() => switchImage(1)}
      >
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