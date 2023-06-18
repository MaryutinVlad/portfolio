export default function constructGrid(content, columnHeight, galleryWidth, gap) {

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
      description: item.description
    }

    currentRowWidth += adjustedWidth

    if (currentRowWidth >= galleryWidth) {

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

      const rowsRatio = rowsWidth.map(rowWidth => 
        galleryWidth / rowWidth
      )

      data.push(row)

      adjustedData = data.map((row, ind) => {
        const gapAdjustment = ((row.length - 1) * (gap)) / row.length

        return row.map(item => {

          const newItem = {
            title: item.title,
            src: item.src,
            description: item.description,
            relativeWidth: `${((item.adjustedWidth * rowsRatio[ind] - gapAdjustment) / galleryWidth) * 100}%`
          }

          return newItem
        })
      })
    }
  })

  return adjustedData 
}
