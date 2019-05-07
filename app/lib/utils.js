const package = require('../../package')

module.exports = {
  log: (...args) => {
    console.log(`[${package.name}]`, ...args)
  }
}
