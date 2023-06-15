export default function constructGrid(content, columnHeight, maxRowWidth, gap) {

  const data = []
  let adjustedData = []
  let rowsWidth = []
  let row = []
  let currentRowWidth = 0
  let maxRowItems = 0
  
  content.map((item, index) => {

    const ratio = item.data.width / item.data.height
    const adjustedWidth = Math.floor(columnHeight * ratio)
    
    const newItem = {
      title: item.title,
      src: item.data,
      adjustedWidth,
      columnHeight,
      description: item.description
    }
    currentRowWidth += adjustedWidth

    if (currentRowWidth >= maxRowWidth) {

      currentRowWidth -= adjustedWidth
      rowsWidth.push(currentRowWidth)
      data.push(row)

      if (maxRowItems < row.length) {
        maxRowItems = row.length
      }

      row = []
      currentRowWidth = adjustedWidth
    }

    row.push(newItem)

    if ((index + 1) === content.length) {

      if (maxRowItems < row.length) {
        maxRowItems = row.length
      }

      rowsWidth.push(currentRowWidth)

      const widestRow = Math.max(...rowsWidth)
      const rowsRatio = rowsWidth.map(rowWidth => 
        widestRow / rowWidth
      )

      data.push(row)

      adjustedData = data.map((row, ind) => {
        let gapAdjustment = 0
        if (maxRowItems > row.length) {
          gapAdjustment = ((maxRowItems - row.length) * gap) / row.length
        }

        return row.map(item => {

          const newItem = {
            title: item.title,
            src: item.src,
            adjustedWidth: Math.floor(item.adjustedWidth * rowsRatio[ind] + gapAdjustment),
            columnHeight: Math.floor(item.columnHeight * rowsRatio[ind] + gapAdjustment),
            description: item.description
          }

          return newItem
        })
      })
    }
  })

  return adjustedData 
}
