import Image from "next/image"

import styles from "../styles/imagePopup.module.css"

export default function ImagePopup({
  imageOpened,
  onSwitchImage,
  onCloseImage,
  onScreenClick
}) {

  let touchStartX = 0

  function closeImage() {
    onCloseImage()
  }

  function switchImage(direction) {
    onSwitchImage(direction)
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
      onDoubleClick={closeImage}
      onTouchStart={onStartTouch}
      onTouchEnd={onEndTouch}
    >
      <div
        className={styles.overlay_arrow}
        onClick={() => switchImage(-1)}
      >
        <button type="button"></button>
      </div>   
        <div className={styles.image_container}>
          <Image
            src={imageOpened.src}
            alt={imageOpened.title}
            width={imageOpened.width}
            height={imageOpened.height}
          />
          <p style={{ width: `${imageOpened.width}px` }}>
            {imageOpened.description}
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