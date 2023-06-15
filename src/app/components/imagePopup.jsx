import Image from "next/image"

import styles from "../styles/imagePopup.module.css"

export default function ImagePopup({
  imageOpened,
  onSwitchImage,
  onCloseImage,
  onScreenClick
}) {

  function closeImage() {
    onCloseImage()
  }

  function switchImage(direction) {
    onSwitchImage(direction)
  }

  function closeOnScreenClick(e) {
    onScreenClick(e)
  }

  return (
    <div
      className={styles.overlay}
      onClick={closeOnScreenClick}
    >
      <div
        className={styles.overlay_arrow}
        onClick={() => switchImage(-1)}
      >
        <button type="button"></button>
      </div>   
      {
        imageOpened && (
          <div
            className={styles.image_container}
          >
            <Image
              src={imageOpened.src}
              alt={imageOpened.alt}
              width={imageOpened.width}
              height={imageOpened.height}
            />
            <p>
              {imageOpened.description}
            </p>
          </div>
        )
      }
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