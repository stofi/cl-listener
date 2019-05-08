const mongoose = require('mongoose');
const controller = require('./controller')
const { log } = require('./lib/utils')
const mongoURI = process.env.MONGO_URI || "mongodb://localhost"

module.exports = async function updateProject(project) {
  const db = mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    dbName: 'cl-test-db'
  })

  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', async () => {

    const stored = [...await controller.get({
      id: options.id
    })]

    if (stored.length === 1) {
      // Project is in the database
      await controller
        .update(project)
        .then(project => {
          log(`updating ${project.id}`)
        })
        .catch(project => {
          log(`problem updating ${project.id}`)
        })


    } else if (project.spent > project.allocated) {
      // Project is not in the db but is spent
      await controller
        .update(project)
        .then(project => {
          log(`adding ${project.id}`)
        })
        .catch(project => {
          log(`problem adding ${project.id}`)
        })
    }
    // Ignore projects that are not in db and are not spent

    db.close()
    log('closed the database connection')
  })
}