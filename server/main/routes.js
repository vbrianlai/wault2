var express = require('express')
var router = express.Router()
var pool = require('./db')

router.get('/api/hello', (req, res) => {
	res.send('hello world')
})


// get users
router.get('/api/get/allUsers', (req, res, next) => {
    pool.query(`SELECT * FROM users`,
                (q_err, q_res) => {
                    res.json(q_res.rows)
                })
});


//create user 
router.post('/api/post/newUser', (req, res, next) => {
    // console.log(res);
    const values = [
        req.body.uid,
        req.body.display_name,
        req.body.email,
    ]
    pool.query(`INSERT INTO users(uid, display_name, email)
                VALUES($1, $2, $3)
                ON CONFLICT DO NOTHING`, values,
                (q_err, q_res) => {
                    if(q_err) return next(q_err);
                    res.json(q_res.rows)
              })
})



// create room 
router.post('/api/post/newRoom', (req, res, next) => {
    console.log(res);
    const values = [
        req.body.rname,
        req.body.rownerid
    ]

    pool.query(`INSERT INTO rooms(rid, rname, rownerid)
                VALUES(uuid_generate_v4(), $1, $2)`, values,
                (q_err, q_res) => {
                    if(q_err) return next(q_err);
                    res.json(q_res.rows)
              })
})

module.exports = router
