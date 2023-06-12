import styles from "../styles/main.module.css"
import constructGrid from "../helpers/gridConstructor"

import Image from "next/image"

export default async function Content({
  title,
  description,
  pictures
}) {

  let maxGalleryWidth = 1000
  const galleryLayout = constructGrid(pictures, 300, 1000)

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>
        {title}
      </h2>
      <p className={styles.description}>
        {description}
      </p>
      <div
        className={styles.gallery}
        style={{ width: `${maxGalleryWidth}px`}}
      >
        {
          galleryLayout.map((row, index) => (
            <div
              key={row + '' + index}
            >
              {row.map(item => (
                <Image
                  key={item.title}
                  src={`/gallery/${item.src}`}
                  width={item.adjustedWidth}
                  height={item.columnHeight}
                  alt={item.title}
                />
              ))}
            </div>
          ))
        }
      </div>
    </main>
  )
}