const controller = require('./controller')
const db = require('./database')
const { log } = require('./lib/utils')

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async function() {

  const projects = [...await controller.index()]
  let ids = projects.map(project=>project.id)

  log('in db:\n', projects)

  for (id of ids) {
    await controller
      .delete({id})
      .then(t => {
        log(`deleting ${id}`)
      })
      .catch(t => {
        log(`problem deleting ${id}`)
      })
  }

  await controller
    .store({
      id: 'outside-id',
      name: 'outside-name',
      allocated: 1
    })
    .then(project => {
      log(`adding ${project.id}`)
    })
    .catch(project => {
      log(`problem deleting ${project.id}`)
    })

  // await controller
  //   .update({
  //     id: '4',
  //     spent: 512
  //   })
  //   .then((res)=>{
  //     log('updated', res)
  //   })
  //   .catch((err) => log)
  //   .finally(()=>{
  //     db.close()
  //   })
  db.close()
  log('closed the database connection')
})
