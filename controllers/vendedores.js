const express = require('express')
const VendedorSchema = require('../schemas/Vendedor')

const oRouter = express.Router()

oRouter.post('/', (req, res) => {

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

oRouter.get('/', (req, res) => {
	let oQuery = VendedorSchema.find()
	oQuery
		.limit(Number(req.query.limit))
		// .select('nome')

	oQuery.exec((oError, aVendedores) => {
		res.json(aVendedores)
	})
})

oRouter.get('/um/:id', (req, res) => {
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

oRouter.get('/:nome', (req, res) => {

	const regex = new RegExp(req.params.nome, 'i');


	let oQuery = VendedorSchema.find({
		nome: regex
	})

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


module.exports = oRouter