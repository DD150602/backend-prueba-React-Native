const express = require('express')
const http = require('http')
const logger = require('morgan')
const cors = require('cors')
const usersRoutes = require('./routes/userRoutes')
const passport = require('passport')

const PORT = process.env.PORT ?? 3000

const app = express()
const server = http.createServer(app)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)
app.disable('x-powered-by')

app.set('PORT', PORT)
usersRoutes(app)

server.listen(PORT, '192.168.80.13' || 'localhost', function () {
  console.log(`App Node.js ${process.pid} ejecutando en ${server.address().address}:${server.address().port}`)
})

app.get('/', (req, res) => {
  res.send('Ruta raiz del Backend')
})

app.get('/test', (req, res) => {
  res.send('estas en la ruta test')
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).send(err.stack)
})
