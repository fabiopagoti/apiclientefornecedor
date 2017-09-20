const express = require('express')
const VendedorSchema = require('../schemas/Vendedor')

const oRouter = express.Router()

oRouter.post('/', (req, res) => {
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


module.exports = oRouter