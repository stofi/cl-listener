const package = require('./package')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const log = (...args) => {
  console.log(`[${package.name}]`, ...args)
}

express()
  .all('/', (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    log(`${new Date()}`)
    log(`New connection from: ${ip}`)
    log(req.body)
    res.sendStatus(200)
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
