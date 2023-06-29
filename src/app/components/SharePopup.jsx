import styles from "../styles/share.module.css"

import socials from "../data/socials.json"

import Image from "next/image"

import { useState } from "react"

export default function SharePopup({onScreenClick, isOpened}) {

  const [ isCopied, setIsCopied ] = useState(false)

  const closePopup = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      onScreenClick()
    }
  }

  const handleCopyClick = () => {

  }

  return (
    <div
      className={styles.overlay}
      onClick={closePopup}
      >
        <div className={styles.container}>
          <p className={styles.title}>
            Share
          </p>
          <div className={styles.link}>
            <span>http://www.adress.com</span>
            <button
              type="button"
              onClick={handleCopyClick}
            />
          </div>
          {
            isCopied && (
              <span>
                COPIED
              </span>
            )
          }
          <div className={styles.socials}>
            {
              socials.map((item) => {
                return(
                  <Image
                    key={item.title}
                    src={`/icons/${item.src}`}
                    alt={item.title}
                    width={55}
                    height={55}
                  />
                )
              })
            }
          </div>
        </div>
    </div>
  )
}