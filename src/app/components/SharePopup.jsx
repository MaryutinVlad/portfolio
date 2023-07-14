import styles from "../styles/share.module.css"

import socials from "../data/socials.json"

import Image from "next/image"

import { useState } from "react"

export default function SharePopup({onScreenClick}) {

  const feedbackLink = 'http://www.adress.com'
  const [ isCopied, setIsCopied ] = useState(false)

  const closePopup = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      setIsCopied(false)
      onScreenClick()
    }
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(feedbackLink)
    setIsCopied(true)
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
            <span>
              {feedbackLink}
            </span>
            <button
              type="button"
              onClick={handleCopyClick}
            >
              {
                isCopied && (
                  <span>
                    COPIED
                  </span>
                )
              }
            </button>
          </div>
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