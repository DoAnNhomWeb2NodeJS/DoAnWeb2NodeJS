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
    if (req.session.tentaikhoan) {
        res.sendFile(path.resolve('public/' + 'home.html'))
    } else {
        res.send('Bạn chưa đăng nhập hoặc phiên làm việc đã hết hạn. <a href="/">Vui lòng quay lại trang đăng nhập</a>')
        res.end()
    }
})

router.post('/', (req, res)=>{
    if (req.session.tentaikhoan) {
        res.send( {tenhienthi: req.session.tenhienthi} )
        res.end()
    }
})

router.get('/giohang', (req, res)=>{
    if (req.session.tentaikhoan) {
        res.send( {giohang: 'daylagiohang'} )
        res.end()
    }
})

module.exports = router