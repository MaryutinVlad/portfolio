import { footer } from "../styles/footer.module.css"

import data from "../data/footer.json"

import IconButton from "./icon-button"

export default function Footer() {
  return (
    <footer className={footer}>
      <div>
        {
          data.icons.map(({title, size}) => (
            <IconButton
              key={title}
              title={title}
              size={size}
            />
          ))
        }
      </div>
      <h3>
        Header alley
      </h3>
      <span>
        2023
      </span>
    </footer>
  )
}