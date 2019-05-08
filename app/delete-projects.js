const force = process.env.FORCE_DELETE_PROJECTS === "true"
const mongoose = require('mongoose');
const controller = require('./controller')
const { log } = require('./lib/utils')
const mongoURI = process.env.MONGO_URI || "mongodb://localhost"

module.exports = async function deleteAllProjects() {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      dbName: 'cl-test-db'
    })
    .then(async mg=>{
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
      mg.connection.close()
      log('Closed the database connection')
    })
    .catch(log)

}

module.exports()
