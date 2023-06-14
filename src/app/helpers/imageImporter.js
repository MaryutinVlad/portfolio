export default function imageImporter(content) {
  const images = []

  content.map(item =>
    images.push({
      title: item.title,
      data: require(`#/public/gallery/${item.src}`).default
    })
  )

  return images
}