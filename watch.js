const watch = require('metalsmith-watch')
const serve = require('metalsmith-serve')

require('./metalsmith')
  .use(
    watch({
      paths: {
        'content/**/*': '**/*',
        'assets/**/*': '**/*',
        'layouts/**/*': '**/*'
      }
    })
  )
  .use(serve({ port: process.env.PORT || 8081 }))
  .build(err => {
    if (err) throw err
  })
