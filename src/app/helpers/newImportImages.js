export default function importImages(gallery, limit = 0) {

  const images = {}

  for (let genre in gallery) {

    images[genre] = []

    if (!limit) {
      limit = genre.length
    }

    for (let ind = 0; ind < limit; ind++) {

      images[genre].push({
        ...gallery[genre][ind],
        src: require(`#/public/gallery/${gallery[genre][ind].src}`).default
      })
    }
  }
  
  return images
}