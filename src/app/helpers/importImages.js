export default function importImages(gallery, mixed = false, limit = 0) {

  const images = mixed ? [] : {}

    for (let genre in gallery) {

      const itemsPerGenre = limit ? limit : gallery[genre].length

      if (!mixed) {
        images[genre] = []
      }
  
      for (let ind = 0; ind < itemsPerGenre; ind++) {
  
        (mixed ? images : images[genre]).push({
          ...gallery[genre][ind],
          data: require(`#/public/gallery/${gallery[genre][ind].src}`).default
        })
      }
    }
    
  
  return images
}