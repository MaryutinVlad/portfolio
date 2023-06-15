export default function zoomImage(image, targetHeight) {
  const ratio = image.adjustedWidth / image.adjusetedHeight

  return {
    src: image.src,
    width: targetHeight * ratio,
    height: targetHeight,
    alt: image.title
  }
}