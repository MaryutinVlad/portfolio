import Image from "next/image"

import { gallery } from "../styles/gallery.module.css"

export default function Gallery({
  galleryLayout,
  maxGalleryWidth,
  onOpenImage
}) {

  function openImage(e) {
    onOpenImage(e)
  }

  return (
    <div
        className={gallery}
        style={{ width: `${maxGalleryWidth}px`}}
      >
        {
          galleryLayout.map((row, index) => (
            <div
              key={row + '' + index}
            >
              {row.map(item => (
                <div key={item.title}>
                  <Image
                    src={item.src}
                    width={item.adjustedWidth}
                    height={item.columnHeight}
                    alt={item.title}
                    onClick={openImage}
                  />
                </div>
              ))}
            </div>
          ))
        }
      </div>
  )
}