const getColor = function (rat) {
  switch (true) {
    case rat < 3:
      return '#E90000'
    case rat < 5:
      return '#E97E00'
    case rat < 7:
      return '#E9D100'
    case rat < 11:
      return '#66E900'
    default:
      return 'grey'
  }
}

export default getColor
