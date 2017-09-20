const express = require('express')

const oRouter = express.Router()

oRouter.get('/', (req, res) => {
	res.json({
		message: "ok"
	})
})

oRouter.use((req, res, next) => {
	res
		.status(404)
		.send("nao existe")

})

module.exports = oRouter