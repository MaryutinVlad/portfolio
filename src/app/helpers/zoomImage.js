export default function zoomImage(image) {

  const { width, height } = image.src
  const ratio = width >= height ? height / width : width / height

  if (Math.abs(window.innerWidth - window.innerHeight) < 300) {
    if (Math.abs(width - height) - 100 < 100) {
      return {
        ...image,
        width: window.innerWidth * .6,
        height: window.innerHeight * .6 * ratio
      }
    }

    if (width > height) {
      return {
        ...image,
        width: window.innerWidth * .75,
        height: window.innerHeight * .75 * ratio
      }
    }
  }

  if (window.innerWidth >= window.innerHeight) {

    if (Math.abs(width - height) - 100 < 100) {
      return {
        ...image,
        width: window.innerWidth * .4,
        height: window.innerHeight * .4 * ratio
      }
    }

    if (width >= height) {

      
      if (Math.abs(width - height) - 100 < 300) {
        return {
          ...image,
          width: window.innerWidth * .5,
          height: window.innerHeight * .5 * ratio
        }
      }

      return {
        ...image,
        width: window.innerWidth * .6,
        height: window.innerWidth * .6 * ratio
      }
    }

    return {
      ...image,
      width: window.innerHeight * .8 * ratio,
      height: window.innerHeight * .8
    
    }
  }

  if (width >= height) {
    return {
      ...image,
      width: window.innerWidth,
      height: window.innerWidth * ratio
    }
  }

  return {
    ...image,
    width: window.innerHeight * .7 * ratio,
    height: window.innerHeight * .7
  }
}