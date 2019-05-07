const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 5000
const { log } = require('./app/lib/utils')
const getBudget = require('./app/cl-api')

const app = express()

app.use(bodyParser.json())

app.all('/', async (req, res) => {
    res.sendStatus(200)
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    log(`${new Date()}`)
    log(`New connection from: ${ip}`)
    if(!req.body.data) return

    log(`Parsing data`)
    let data = req.body.data.map(event=>event.data[0])
    let ids = []
    data.forEach(entry=>{
      let pid = entry.assignment.project_id
      if (pid !== null && ids.indexOf(pid) === -1) ids.push(pid)
    })
    if(ids.length === 0) return

    log('Data:')
    log(data)
    log('IDs:')
    log(ids)
    log('Budgets:')
    for (id of ids) {
      let budget = await getBudget({id})
      log(id, budget)
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
