export default function constructGrid(content, columnHeight, maxRowWidth) {

  const data = []
  let adjustedData = []

  let rowsWidth = []
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
      currentRowWidth -= adjustedWidth
      rowsWidth.push(currentRowWidth)
      data.push(row)
      row = []
      currentRowWidth = adjustedWidth
    }
    row.push(newItem)

    if ((ind + 1) === content.length) {
      rowsWidth.push(currentRowWidth)
      const widestRow = Math.max(...rowsWidth)
      const rowsRatio = rowsWidth.map(rowWidth => 
        widestRow / rowWidth
      )
      data.push(row)

      adjustedData = data.map((row, ind) => row.map(item => {
        const newItem = {
          title: item.title,
          src: item.src,
          adjustedWidth: Math.floor(item.adjustedWidth * rowsRatio[ind]),
          columnHeight: Math.floor(item.columnHeight * rowsRatio[ind])
        }
        return newItem
      }
      ))
    }
  })

  return adjustedData
}
