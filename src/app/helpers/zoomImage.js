export default function zoomImage(image) {

  const { width, height } = image.src
  const ratio = width >= height ? height / width : width / height

  if (window.innerWidth >= window.innerHeight && width >= height) {

    let shrinkFactor = 90

    while (shrinkFactor) {
      if (window.innerHeight * .9 > window.innerWidth * (shrinkFactor * .01) * ratio) {
        shrinkFactor *= .01
        break
      }

      shrinkFactor -= 1
    }

    return {
      ...image,
      width: window.innerWidth * shrinkFactor,
      height: window.innerWidth * shrinkFactor * ratio
    }
  }

  if (width >= height) {

    return {
      ...image,
      width: window.innerWidth * .9,
      height: window.innerWidth * .9 * ratio
    }
  }

  return {
    ...image,
    width: window.innerHeight * .8 * ratio,
    height: window.innerHeight * .8
  }
}