const apiKey = process.env.MAILGUN_API_KEY
const domain = process.env.MAILGUN_DOMAIN
const CLIENT_EMAIL_ADDRESS = process.env.CLIENT_EMAIL_ADDRESS
const SENDER_EMAIL_ADDRESS = process.env.SENDER_EMAIL_ADDRESS

const mailgun = require('mailgun-js')({apiKey, domain})
const mongoose = require('mongoose');
const controller = require('./app/controller')
const { log } = require('./app/lib/utils')
const mongoURI = process.env.MONGO_URI || "mongodb://localhost"

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    dbName: 'cl-test-db'
  })
  .then(async mg => {
    let projects = await controller.index()

    projects = projects.filter(p=>((p.allocated < p.spent) && !p.didNotify))

    for (project of projects) {
      let data = {
        from: SENDER_EMAIL_ADDRESS,
        to: CLIENT_EMAIL_ADDRESS,
        subject: `Exceeded allocated time on ${project.name}`,
        text: `
          Project: ${project.name}
          Activity: ${project.activity}
          Person: ${project.person}
          Task: ${project.task}
          Time: ${(project.allocated).toFixed(2)}/${(project.spent).toFixed(2)}
        `
      }
      await mailgun.messages().send(data)
    }

    log('Closed the database connection')
  })
  .catch(log)
