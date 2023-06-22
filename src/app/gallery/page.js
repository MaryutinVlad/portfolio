"use client"

import dynamic from "next/dynamic"

import imagesData from "../data/gallery.json"

import importImages from "../helpers/importImages"

import { title } from "../styles/home.module.css"
import styles from "../styles/galleryPage.module.css"

export default function Gallery() {

  const genres = importImages(imagesData, false)

  const resizeGenre = (e) => {
    e.target.closest('div').classList.toggle(styles.genre_container_collapsed)
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
        className={title}
        style={{
          marginLeft: '20px',
          marginTop: '30px'
        }}
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
              <p
                className={styles.genre_title}
                style={{
                  letterSpacing: '6px',
                  margin: '20px auto 0'
                }}
                onClick={resizeGenre}
              >
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </p>
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
