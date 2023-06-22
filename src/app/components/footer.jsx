import { footer } from "../styles/footer.module.css"

import ShareButtons from "./ShareButtons"

export default function Footer() {
  return (
    <footer className={footer}>
      <ShareButtons
        size={[20, 24]}
        gap={20}
      />
      <h3>
        Header alley
      </h3>
      <span>
        2023
      </span>
    </footer>
  )
}