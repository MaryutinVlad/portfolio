import Image from "next/image"

import styles from "../styles/imagePopup.module.css"

export default function ImagePopup({
  prevImage,
  currentImage,
  nextImage,
  onSwitchImage,
  onCloseImage,
  onScreenClick
}) {

  let touchStartX = 0

  function closeImage() {
    onCloseImage()
  }

  function switchImage(toNext) {
    onSwitchImage(toNext)
  }

  function closeOnScreenClick(e) {
    onScreenClick(e)
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
        onClick={() => switchImage(false)}
      >
        <button type="button"></button>
      </div>   
        <div className={styles.image_container}>
          <Image
            src={currentImage.src}
            alt={currentImage.title}
            width={currentImage.width}
            height={currentImage.height}
          />
          <p style={{ width: `${currentImage.width}px` }}>
            {currentImage.description}
          </p>
        </div>
       
      <div
        className={styles.overlay_arrow}
        onClick={() => switchImage(true)}
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