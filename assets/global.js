;(function() {
  hljs.initHighlightingOnLoad()
  window.onload = () => {
    stickybits('.sticky', { noStyles: true })
    // zoom image
    const images = document.querySelectorAll('#js-content img')
    if (window.zoom != null && images.length > 0) images.forEach(window.zoom)

    // Insert FB like box in the middle of content
    const fbBox = document.getElementById('js-fb-box')
    const ps = document.querySelectorAll('#js-content p')
    if (fbBox && ps) {
      const parent = document.getElementById('js-content')
      const archor = ps[Math.ceil(ps.length / 4)]
      parent.insertBefore(fbBox, archor)
    }
  }
})()
