;(function() {
  hljs.initHighlightingOnLoad()
  window.onload = () => {
    stickybits('.sticky', { noStyles: true })
    // zoom image
    zoom(document.querySelector('#js-content img'))
  }
})()
