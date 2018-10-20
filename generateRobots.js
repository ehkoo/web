const fs = require('fs')
const path = require('path')

const { BRANCH } = process.env
const robotFile = path.resolve(__dirname, 'robots.txt')
const targetFile = path.resolve(__dirname, 'dist/robots.txt')

// Copy robots.txt to root folder to disable search engines from indexing
// beta.ehkoo.com
console.log(`The current branch is ${BRANCH}`)
if (BRANCH != null && BRANCH !== 'master') {
  fs.createReadStream(robotFile).pipe(fs.createWriteStream(targetFile))
}
