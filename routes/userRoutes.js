const usersController = require('../controllers/usersController')
module.exports = (app) => {
  app.post('/api/Users/create', usersController.register)
  app.post('/api/Users/login', usersController.login)
}
