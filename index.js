const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const controllerVendedores = require('./controllers/vendedores')
const controllerLogin = require('./controllers/login')
const controllerOthers = require('./controllers/others')

const app = express()

mongoose.connect('mongodb://localhost/api')

app.use(bodyParser.json())
app.use('/vendedores', controllerVendedores)
app.use('/login', controllerLogin)
app.use(controllerOthers)

app.listen(3000, () => {
	console.log('API is up')
})