const changeColor = () => {
  $('.row-header').on('click', () => {
    $('.row-header').css('background-color','green')
  })
}


$(() => {
  changeColor()
})
