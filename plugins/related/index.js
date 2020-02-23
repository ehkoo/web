module.exports = function(params = {}) {
  const opts = {
    exclude: [],
    min_posts: 1,
    min_matches: 1,
    attribute: 'tags',
    ...params,
  }
  var tags = opts.attribute
  return function(files, metalsmith, done) {
    setImmediate(done)
    var files2 = files
    Object.keys(files).forEach(function(file) {
      var post = files[file]
      if (typeof post[tags] !== 'undefined') {
        var related = Object.keys(files2)
          .map(file2 => {
            var count = 0
            var post2 = files2[file2]
            if (post !== post2) {
              for (tag of post[tags]) {
                if (
                  typeof post2[tags] !== 'undefined' &&
                  !opts.exclude.includes(tag) &&
                  post2[tags].includes(tag)
                ) {
                  count++
                }
              }
            }
            return { file: file2, count: count }
          })
          .filter(match => {
            return (
              files[match.file] !== post &&
              match.count !== 0 &&
              match.count >= opts.min_matches &&
              files[match.file].draft !== true
            )
          })
          .sort((a, b) => {
            return b.count - a.count
          })

        if (related.length < opts.min_posts) {
          return
        }
        if (typeof opts.max_posts !== 'undefined') {
          related = related.slice(0, opts.max_posts)
        }
        //get full file
        post.related = related.map(match => files[match.file])
      }
    })
  }
}
