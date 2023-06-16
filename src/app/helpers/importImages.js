export default function imageImporter(content, limit) {
  const images = []

  content.map(item =>
    images.push({
      title: item.title,
      description: item.description,
      data: require(`#/public/gallery/${item.src}`).default
    })
  )

  return images
}