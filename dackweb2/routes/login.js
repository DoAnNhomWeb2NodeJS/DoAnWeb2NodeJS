var express = require('express')
var path = require('path')
var router = express.Router()
var performQuery = require('../public/javascripts/db')


router.get('/', (req, res)=>{
    res.sendFile(path.resolve('public/' + 'login.html'))
})

router.post('/', (req, res)=>{

    let username = req.body.Username
    let password = req.body.Password
    let remember = req.body.Remember

    let query = 'SELECT * FROM taikhoan where tentaikhoan = $1'
    let values = [username]

    performQuery(query, values, (results)=>{
        
        let userDB, passwordDB, tenhienthiDB, diachiDB, emailDB, dienthoaiDB, maloaitaikhoanDB
        
        results.rows.forEach(e => {
            userDB = e.tentaikhoan
            passwordDB = e.matkhau
            tenhienthiDB = e.tenhienthi
            diachiDB = e.diachi
            emailDB = e.email
            dienthoaiDB = e.dienthoai
            maloaitaikhoanDB = e.maloaitaikhoan
        })
        
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

module.exports = router