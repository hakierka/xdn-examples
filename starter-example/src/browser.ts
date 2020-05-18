import install from '@xdn/prefetch/window/install'
import $ from 'jquery'

document.addEventListener('DOMContentLoaded', function () {
  install()

  $('#testJsonp').click(function () {
    $.ajax({
      url: '/fetch-data',
      dataType: 'jsonp',
    }).then((data) => {
      console.log('data', data)
    })
  })
})