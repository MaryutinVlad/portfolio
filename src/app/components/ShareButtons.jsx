import Image from "next/image"

import { buttons } from "../styles/header.module.css"

export default function shareButtons({size, gap}) {
  return (
    <div
      className={buttons}
      style={{ gap: `${gap}px`}}
    >
      <Image
        width={size[0]}
        height={size[0]}
        src="/icons/share.svg"
        alt="share"
      />
      <Image
        width={size[1]}
        height={size[1]}
        src="/icons/instagram.svg"
        alt="instagram"
      />
    </div>
  )
}