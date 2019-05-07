const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 5000
const { log } = require('./app/lib/utils')

const app = express()

app.use(bodyParser.json())

app.all('/', (req, res) => {
    res.sendStatus(200)
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    log(`${new Date()}`)
    log(`New connection from: ${ip}`)
    let data = req.body.data.map(entry => entry.data )
    log('\n', data)
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
