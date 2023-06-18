import styles from "../styles/about.module.css"

import imagesData from "../data/gallery.json"

import importImages from "../helpers/importImages"

import Gallery from "../components/gallery"

export default async function About() {

  const images = importImages(imagesData, true)

  return (
    <div className={styles.container}>
      <Gallery
        images={images}
        rowHeight={500}
        widthFactor={1}
      />
    </div>
  )
}
