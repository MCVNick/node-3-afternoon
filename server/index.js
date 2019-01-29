require('dotenv').config()
const express = require('express')
const { json } = require('body-parser')
const session = require('express-session')
const { SERVER_PORT, SESSION_SECRET } = process.env
const PORT = SERVER_PORT || 3020
const checkForSession = require('./middlewares/checkForSession')
const swagController = require('./controllers/swag_controller')
const authController = require('./controllers/auth_controller')
const cartController = require(`./controllers/cart_controller`)
const searchController = require('./controllers/search_controller')

const app = express()
app.use(json())
app.use(express.static('build'))
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession)

app.get(`/api/swag`, swagController.read)
app.post(`/api/login`, authController.login)
app.post(`/api/register`, authController.register)
app.post(`/api/signout`, authController.signout)
app.get(`/api/user`, authController.getUser)
app.post(`/api/cart`, cartController.add)
app.post(`/api/cart/checkout`, cartController.checkout)
app.delete(`/api/cart`, cartController.delete)
app.get(`/api/search`, searchController.search)


app.listen(PORT, () => console.log('Listening on port', PORT))