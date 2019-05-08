const axios = require('axios')
const API_URL = process.env.COSTLOCKER_API_URL || 'https://new.costlocker.com/api-public/v2'
const APP_NAME = process.env.COSTLOCKER_APP_NAME
const APP_TOKEN = process.env.COSTLOCKER_APP_TOKEN

axios.defaults.baseURL = API_URL
axios.defaults.auth = {
  username: APP_NAME,
  password: APP_TOKEN
}
axios.defaults.headers.post['Content-Type'] = 'application/json'

const getProjectBudget = async ({id}) => {
  return new Promise((resolve, reject) => {
    axios.get(`/projects/${id}`)
      .then((response)=>{
        let activities = response.data.data.items.filter(entry=>entry.item.type==='activity')



        let timeBudget = {
          allocated: 0,
          spent: 0
        }
        if (activities.length === 0) reject(timeBudget)

        activities.forEach(act => timeBudget.allocated += act.hours.budget)
        activities.forEach(act => timeBudget.spent += act.hours.tracked)

        resolve(timeBudget)
      })
      .catch(reject)
  })
}

module.exports = getProjectBudget
