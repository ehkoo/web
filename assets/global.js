;(function() {
  hljs.initHighlightingOnLoad()
  window.onload = () => {
    stickybits('.sticky', { noStyles: true })
    // zoom image
    if (window.zoom != null) window.zoom(document.querySelector('#js-content img'))
  }
})()
