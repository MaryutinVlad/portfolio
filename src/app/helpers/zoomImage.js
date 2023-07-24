export default function zoomImage(image) {

  const { width, height } = image.src
  const ratio = width / height

  let zoomedHeight = window.innerHeight * .8
  let zoomedWidth = zoomedHeight * ratio

  if (zoomedWidth > window.innerWidth) {
    
    const arrowAdjustment = window.innerWidth > 650 ? 100 : 10

    for (zoomedWidth; zoomedWidth > (window.innerWidth - arrowAdjustment); zoomedWidth -= 10) {
      zoomedHeight = zoomedHeight - (10 * ratio)
    }
  }

  return {
    ...image,
    width: zoomedWidth,
    height: zoomedHeight
  }
}