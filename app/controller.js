const { Project } = require('./models');

module.exports = {
  index: () => {
    return new Promise((resolve, reject) => {
      Project.find()
        .sort({ createdAt: -1 })
        .lean()
        .then(resolve)
        .catch(reject)
    })
  },

  store: (options) => {
    if (!options.id) {
      return new Promise((resolve, reject) => {
        reject(new Error('New Project has to have an ouside ID'))
      })
    }
    const creationDate = new Date();
    const data = {
      id: options.id,
      createdAt: creationDate,
      updatedAt: creationDate,
      name: options.name,
      allocated: options.allocated,
      spent: options.spent,
      activity: options.activity,
      person: options.person,
      task: options.task,
      didNotify: false
    };
    return new Promise((resolve, reject) => {
      Project.create(data)
        .then(() =>
          resolve(data)
        )
        .catch(reject)
    })
  },

  get: ({id}) => {
    return new Promise((resolve, reject) => {
      Project.find({id})
        .sort({ createdAt: -1 })
        .lean()
        .then(resolve)
        .catch(reject)
    })
  },

  delete: ({id}) => {
    return new Promise((resolve, reject) => {
      Project.findOneAndDelete({id})
        .then(resolve)
        .catch(reject)
    })
  },

  update: (options) => {
    const updateDate = new Date()
    let id = options.id
    return new Promise((resolve, reject) => {
      Project.findOne({id})
        .then(p=>{
          p.updatedAt = updateDate
          p.spent = options.spent || p.spent
          p.name = options.name || p.name
          p.allocated = options.allocated || p.allocated
          p.spent = options.spent || p.spent
          p.activity = options.activity || p.activity
          p.person = options.person || p.person
          p.task = options.task || p.task
          p.didNotify = false
          return p.save()
        })
        .then(resolve)
        .catch(reject)
    })
  },

  finnish: ({id}) => {
    const updateDate = new Date()
    return new Promise((resolve, reject) => {
      Project.findOne({id})
        .then(p=>{
          p.updatedAt = updateDate
          p.didNotify = true
          return p.save()
        })
        .then(resolve)
        .catch(reject)
    })
  }
}
