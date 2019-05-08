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
    data = data.filter(event=>{
      let pid = event.assignment.project_id
      if (pid !== null && ids.indexOf(pid) === -1) {
        ids.push(pid)
        return true
      } else return false
    })
    let projects = data.map(event=>({

    }))
    let projects = data.map(event=> ({
      id: event.assignment.project_id,
      name: event.names.project_name,
      activity: event.names.activity_name,
      person: event.names.person_fullname,
      task: event.names.task_name || ''
    }))

    data.forEach(event=>{
      let pid = event.assignment.project_id
      if (pid !== null && ids.indexOf(pid) === -1) ids.push(pid)
    })
    if(ids.length === 0) return

    log('Data:')
    log(data)
    log('Projects:')
    log(projects)
    log('IDs:')
    log(ids)
    log('Budgets:')
    for (project of projects) {
      let id = project.id
      let budget = await getBudget({id})
      project.allocated = budget.allocated
      project.spent = budget.spent
      log(project)
      // dont just log this
      // now it's time to use the database
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
