"use client"

import dynamic from "next/dynamic"

import imagesData from "../data/gallery.json"

import importImages from "../helpers/importImages"

import styles from "../styles/galleryPage.module.css"

export default function Gallery() {

  const genres = importImages(imagesData, false)

  const resizeGenre = (e) => {
    e.target.closest('div').classList.toggle(styles.genre_container_collapsed)
    e.target.classList.toggle(styles.genre_resize_collapsed)
  }

  const Gallery = dynamic(
    () => {
      return import("../components/Images")
    },
    { ssr: false }
  )

  return (
    <main>
      <h2
        className={styles.title}
      >
        Works
      </h2>
      <div className={styles.genres}>
        {
          Object.keys(genres).map((genre) => (
            <div
              key={genre}
              className={styles.genre_container}
            >
              <p className={styles.genre_title}>
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </p>
              <button
                className={styles.genre_resize}
                onClick={resizeGenre}
              >
              </button>
              <Gallery
                images={genres[genre]}
                rowHeight={300}
                widthFactor={.9}
              />
            </div>
          ))
        }
      </div>
    </main>
  )
}
