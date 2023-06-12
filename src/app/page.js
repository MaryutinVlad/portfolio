import Content from "./components/content"

import pictures from "./data/content.json"

export default function Home() {
  return (
    <>
      <Content
        title="Some artist and painter based somewhere"
        description="Artist's basic materials and techniques"
        pictures={pictures}
      />
    </>
  )
}
