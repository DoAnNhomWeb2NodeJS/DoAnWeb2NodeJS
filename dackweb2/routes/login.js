var express = require('express')
var path = require('path')
var pg = require('pg')
var router = express.Router()

var config = {
    user: 'postgres',
    database: 'web2',
    password: 'chithong',
    host: 'localhost',
    port: 5432
}
var pool = new pg.Pool(config)

router.get('/', (req, res)=>{
    res.sendFile(path.resolve('public/' + 'login.html'))
})

router.post('/', (req, res)=>{

    let username = req.body.Username
    let password = req.body.Password
    let remember = req.body.Remember

    pool.connect((err, client, done)=> {
        if (err) {
            return console.log("error fetching client from pool", err)
        }

        const sqlS = 'SELECT * FROM taikhoan where tentaikhoan = $1'
        const values = [username]    
        
        client.query(sqlS, values, (err, result)=> {
            done()
            if (err) {
                res.end()
                return console.error('error runing query', err)
            }

            let userDB = result.rows[0].tentaikhoan
            let passwordDB = result.rows[0].matkhau
            let tenhienthiDB = result.rows[0].tenhienthi
            let diachiDB = result.rows[0].diachi
            let emailDB = result.rows[0].email
            let dienthoaiDB = result.rows[0].dienthoai
            let maloaitaikhoanDB = result.rows[0].maloaitaikhoan
            
            if (username == userDB && password == passwordDB) {
                req.session.tentaikhoan = userDB
                req.session.dienthoai = passwordDB
                req.session.email = emailDB
                req.session.diachi = diachiDB
                req.session.tenhienthi = tenhienthiDB
                req.session.maloaitaikhoan = maloaitaikhoanDB
                
                if (maloaitaikhoanDB === '1') {//admin
                    res.send( {login: 1} )
                    res.end()
                }
                if (maloaitaikhoanDB === '0') {//user
                    res.send( {login: 0} )
                    res.end()
                }
            } else {
                res.send( {login: false} )
                res.end()
            }
        })
    })
})

module.exports = router