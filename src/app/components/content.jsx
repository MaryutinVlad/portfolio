import { gallery } from "../styles/main.module.css"

export default async function Content({
  title,
  description,
  pictures
}) {

  return (
    <main>
      <h2>
        {title}
      </h2>
      <p>
        {description}
      </p>
      <div className={gallery}>
      </div>
    </main>
  )
}