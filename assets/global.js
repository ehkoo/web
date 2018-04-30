;(function() {
  window.onload = () => {
    const qid = document.getElementById.bind(document)
    const qsa = document.querySelectorAll.bind(document)

    stickybits('.sticky', { noStyles: true })

    // zoom image
    const images = qsa('#js-content img')
    if (window.zoom != null && images.length > 0) images.forEach(window.zoom)

    // Insert FB like box in the middle of content
    {
      const fbBox = qid('js-widgets')
      const ps = qsa('#js-content > p')
      if (fbBox && ps) {
        const parent = qid('js-content')
        const archor = ps[Math.ceil(ps.length / 4)]
        parent.insertBefore(fbBox, archor)
      }
    }

    // Open links in new windows
    qsa('#js-content a').forEach(a => {
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
    })

    // Arcodion for series menu
    {
      const tocHeadings = [...qsa('h2.js-series-toc-heading')]
      const tocLists = [...qsa('ul.series-toc-list')]

      tocHeadings.forEach(heading =>
        heading.addEventListener('click', e => {
          e.preventDefault()

          const toc = qid(`js-series-toc-list-${e.currentTarget.dataset.sectionId}`)
          tocLists.forEach(list => list.classList.add('series-toc-list--hidden'))

          toc && toc.classList.toggle('series-toc-list--hidden')
        })
      )

      // Show current section
      const [a] = [...qsa('#js-series-toc a')].filter(a => a.dataset.activeSection != null)
      if (a) {
        const section = qid(`js-series-toc-list-${a.dataset.activeSection}`)
        section && section.classList.remove('series-toc-list--hidden')
      }

      // Open TOC
      const toc = qid('js-series-toc')
      const tocBtn = qid('js-toc-button')
      tocBtn &&
        tocBtn.addEventListener('click', e => {
          e.preventDefault()
          toc.classList.toggle('clip-s')
          toc.classList.toggle('fixed')
          toc.classList.toggle('absolute--fill')
          document.body.classList.toggle('overflow-hidden')
        })
    }
  }
})()
