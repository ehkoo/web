window.onload = function ehkoo() {
  function toggleMobileNav() {
    const toggler = document.getElementById('js-toggle-mobile-nav')

    if (toggler) {
      const up = toggler.querySelector('i[data-icon="up"]')
      const down = toggler.querySelector('i[data-icon="down"]')
      const nav = document.getElementById('js-mobile-nav')

      toggler.addEventListener(
        'click',
        e => {
          e.preventDefault()
          up.classList.toggle('hidden')
          down.classList.toggle('hidden')
          nav.classList.toggle('hidden')
          document.body.classList.toggle('overflow-hidden')
        },
        false,
      )
    }
  }

  function toggleToc() {
    const toggler = document.getElementById('js-toggle-toc')
    const up = toggler.querySelector('i[data-icon="up"]')
    const down = toggler.querySelector('i[data-icon="down"]')
    const toc = document.getElementById('js-toc')

    toggler.addEventListener(
      'click',
      e => {
        e.preventDefault()
        up.classList.toggle('hidden')
        down.classList.toggle('hidden')
        toc.classList.toggle('hidden')
      },
      false,
    )
  }

  toggleMobileNav()
  toggleToc()
}
