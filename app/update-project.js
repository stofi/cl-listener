const mongoose = require('mongoose');
const controller = require('./controller')
const { log } = require('./lib/utils')
const mongoURI = process.env.MONGO_URI || "mongodb://localhost"

module.exports = async function updateProject(project) {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      dbName: 'cl-test-db'
    })
    .then(async mg => {
      log('Connected to database')

      // Get project from db
      const stored = [...await controller.get({
        id: project.id
      })]


      if (stored.length === 1) {
        // Project is in the database
        log('updating', project)
        await controller
          .update(project)
          .then(project => {
            log(`updated ${project.id}`)
          })
          .catch(project => {
            log(`problem updating ${project.id}`)
          })


      } else if (project.spent > project.allocated) {
        log('adding', project)
        // Project is not in the db but is spent
        await controller
          .store(project)
          .then(project => {
            log(`added ${project.id}`)
          })
          .catch(project => {
            log(`problem adding ${project.id}`)
          })
      }
      // Ignore projects that are not in db and are not spent

      mg.connection.close()
      log('Closed the database connection')
    })
    .catch(log)

}
