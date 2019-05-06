const package = require('./package')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const log = (...args) => {
  console.log(`[${package.name}]`, ...args)
}

express()
  .get('/', (req, res) => {
    // let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    let ip = 420
    log(`${new Date()}`)
    log(`New connection from: ${ip}`)
    res.sendStatus(200)
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
