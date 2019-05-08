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

  store: ({id, name, allocated}) => {
    if (!id) {
      return new Promise((resolve, reject) => {
        reject(new Error('New Project has to have an ouside ID'))
      })
    }
    const creationDate = new Date();
    const data = {
      id: id,
      name: name,
      allocated: allocated,
      spent: 0,
      createdAt: creationDate,
      updatedAt: creationDate,
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

  update: ({id, spent}) => {
    return new Promise((resolve, reject) => {
      Project.findOne({id})
        .then(p=>{
          p.spent = spent
          return p.save()
        })
        .then(resolve)
        .catch(reject)
    })
  },

  finnish: ({id}) => {
    return new Promise((resolve, reject) => {
      Project.findOne({id})
        .then(p=>{
          p.didNotify = true
          return p.save()
        })
        .then(resolve)
        .catch(reject)
    })
  }
}
