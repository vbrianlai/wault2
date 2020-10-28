var express = require('express')
var router = express.Router()
var pool = require('./db')

router.get('/api/hello', (req, res) => {
	res.send('hello world')
})


// get users
router.get('/api/get/allUsers', (req, res, next) => {
    pool.query(`SELECT * FROM users
                ORDER BY date_created DESC`,
                (q_err, q_res) => {
                    res.json(q_res.rows)
    })
});


//create user 
router.post('/api/post/newUser', (req, res, next) => {
    console.log(res);
    const values = [req.body.uid,
                    req.body.display_name,
                    req.body.email,
                    // req.body.date_created,
                    // req.body.last_login
                    ]
    pool.query(`INSERT INTO users(uid, display_name, email)
                VALUES($1, $2, $3)
                ON CONFLICT DO NOTHING`, values,
                (q_err, q_res) => {
                    res.json(q_res.rows
                    )}
                )
})

module.exports = router
