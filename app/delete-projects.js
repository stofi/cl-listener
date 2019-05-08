const force = process.env.FORCE_DELETE_PROJECTS === "true"
const mongoose = require('mongoose');
const controller = require('./controller')
const { log } = require('./lib/utils')
const mongoURI = process.env.MONGO_URI || "mongodb://localhost"

module.exports = async function deleteAllProjects() {
  const db = mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    dbName: 'cl-test-db'
  })

  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () =>
    const projects = [...await controller.index()]
    let ids = projects.map(project=>project.id)

    log("Deleting everything")

    for (id of ids) {
      await controller
        .delete({id})
        .then(t => {
          log(`  - deleting ${id}`)
        })
        .catch(t => {
          log(`  - problem deleting ${id}`)
        })
    }
    db.close()
    log('closed the database connection')
  })
}
