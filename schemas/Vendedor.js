const mongoose = require('mongoose')

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

module.exports = VendedorSchema