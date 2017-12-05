;(function() {
  hljs.initHighlightingOnLoad()
  window.onload = () => {
    stickybits('.sticky', { noStyles: true })
    // zoom image
    const images = document.querySelector('#js-content img')
    if (window.zoom != null && images) window.zoom(images)

    // Insert FB like box in the middle of content
    const fbBox = document.getElementById('js-fb-box')
    const ps = document.querySelectorAll('#js-content p')
    if (fbBox && ps) {
      const parent = document.getElementById('js-content')
      const archor = ps[Math.ceil(ps.length / 2)]
      parent.insertBefore(fbBox, archor)
    }
  }
})()
