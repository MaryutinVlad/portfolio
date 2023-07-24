import dynamic from "next/dynamic"

import styles from "../styles/genre.module.css"

export default function Genre({images, title}) {

  let collapsed = false
  let genreFullSize = 0

  const resizeGenre = (e) => {
    e.target.classList.toggle(styles.genre_resize_collapsed)

    if (!collapsed) {
      genreFullSize = e.target.closest('div').offsetHeight
      e.target.closest('div').style.maxHeight = `${e.target.closest('div').offsetHeight}px`
      e.target.closest('div').style.maxHeight = "64px"
      collapsed = true
      
    } else {
      e.target.closest('div').style.maxHeight = `${genreFullSize}px`
      collapsed = false
    }
  }

  const Gallery = dynamic(
    () => {
      return import("./Images")
    },
    { ssr: false }
  )

  return (
    <div
      className={styles.genre_container}
    >
      <p className={styles.genre_title}>
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </p>
      <button
        className={styles.genre_resize}
        onClick={resizeGenre}
      >
      </button>
      <Gallery
        images={images}
        rowHeight={300}
        widthFactor={.9}
      />
    </div>
  )
}