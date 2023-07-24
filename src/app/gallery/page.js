"use client"

import imagesData from "../data/gallery.json"

import importImages from "../helpers/importImages"

import Genre from "../components/Genre"

import styles from "../styles/galleryPage.module.css"

export default function Gallery() {

  const genres = importImages(imagesData, false)

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
            <Genre
            key={genre}
            title={genre}
            images={genres[genre]}
            rowHeight={300}
            widthFactor={.9}
            />
          ))
        }
      </div>
    </main>
  )
}
