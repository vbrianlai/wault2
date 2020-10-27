var express = require('express')
var router = express.Router()

router.get('/api/hello', (req, res) => {
	res.send('hello world')
})

module.exports = router
