import styles from "../styles/share.module.css"

import socials from "../data/socials.json"

import Link from "next/link"

import { useState } from "react"

export default function SharePopup({onScreenClick, isOpened}) {

  const [ isCopied, setIsCopied ] = useState(false)

  const closePopup = ({ target, currentTarget }) => onScreenClick({ target, currentTarget })

  const handleCopyClick = () => {

  }

  return (
    <div
      className={styles.overlay}
      onClick={closePopup}
      //style={!isOpened ? { visibility: 'hidden', opacity: 0, transition: 'opacity 1s linear' } : { visibility: 'visible', opacity: 1, transition: 'opacity 1s linear' }}
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
              socials.map((item) => { const image = require(`../../../public/icons/${item.src}`).default
              return(
                <Link
                  key={item.title}
                  href={item.href}
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundImage: `url(${image.src})`
                  }}
                ></Link>
              )})
            }
          </div>
        </div>
    </div>
  )
}