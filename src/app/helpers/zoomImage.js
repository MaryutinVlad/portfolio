export default function zoomImage(image, targetHeight, ratio) {

  return {
    src: image.src,
    width: targetHeight * ratio,
    height: targetHeight,
    alt: image.title,
    description: image.description
  }
}