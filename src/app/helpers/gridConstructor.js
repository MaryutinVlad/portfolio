export default function constructGrid(content, columnHeight, maxRowWidth) {

  const data = []

  let row = []
  let currentRowWidth = 0
  
  content.map((item, ind) => {
    const { width, height } = require(`#/public/gallery/${item.src}`).default
    const ratio = width / height
    const adjustedWidth = Math.floor(columnHeight * ratio)
    const newItem = {
      title: item.title,
      src: item.src,
      adjustedWidth,
      columnHeight
    }

    currentRowWidth += adjustedWidth

    if (currentRowWidth >= maxRowWidth) {
      data.push(row)
      row = []
      currentRowWidth = adjustedWidth
    }
    row.push(newItem)

    if ((ind + 1) === content.length) {
      data.push(row)
    }
  })
  return data
}
