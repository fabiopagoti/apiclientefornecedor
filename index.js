const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

mongoose.connect('mongodb://localhost/api')

app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.json({
		message: "ok"
	})
})

const VendedorSchema = mongoose.model('Vendedor', {
	nome: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	telefone: {
		type: String,
		required: true
	},
	senha: {
		type: String,
		required: false
	}
}, 'vendedores')

app.post('/vendedores', (req, res) => {

	let oVendedor = new VendedorSchema(req.body)
	oVendedor.save({

	}, (oError, oNewVendedor, iNumAffected) => {
		if (oError) {
			res
				.status(400)
				.send(oError)
			return
		}

		res
			.status(201)
			.json(oNewVendedor)
	})
})

app.get('/vendedores', (req, res) => {
	let oQuery = VendedorSchema.find()
	oQuery
		.limit(Number(req.query.limit))
		// .select('nome')

	oQuery.exec((oError, aVendedores) => {
		res.json(aVendedores)
	})
})

app.get('/vendedor/:id', (req, res) => {
	let oQuery = VendedorSchema.findById(req.params.id)

	oQuery.exec((oError, oVendedor) => {
		if (!oVendedor) {
			res
				.status(404)
				.json({
					message: "Not found"
				})
			return
		}
		res
			.status(200)
			.json(oVendedor)
	})
})


app.post('/login', (req, res) => {
	VendedorSchema.findOne(req.body, (oError, oVendedor) => {
		if (!oVendedor) {
			res
				.status(403)
				.json({
					message: "Usuário ou senha inválido"
				})
			return
		}
		res
			.status(202)
			.send(oVendedor)
	})
})

app.listen(3000, () => {
	console.log('API is up')
})