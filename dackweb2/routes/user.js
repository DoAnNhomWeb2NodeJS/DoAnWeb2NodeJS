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

router.get('/daugiacuatoi', (req, res)=>{
    if (req.session.tentaikhoan) {
        res.send( {daugiacuatoi: 'dayladaugiacuatoi'} )
        res.end()
    }
})

router.get('/canhan', (req, res)=>{
    if (req.session.tentaikhoan) {
        res.send( {canhan: 'daylacanhan'} )
        res.end()
    }
})

router.get('/lichsumua', (req, res)=>{
    if (req.session.tentaikhoan) {
        let mang1 = [
            {
                id: '1',
                name: 'mot'
            }
        ]
        let mang2 = [
            {
                id: '1',
                name: 'mot'
            },
            {
                id: '2',
                name: 'hai'
            }
        ]
        res.send( {lichsumua1: mang1, lichsumua2: mang2} )
        res.end()
    }
})

router.get('/logout', (req, res)=>{
    if (req.session.tentaikhoan) {
        req.session.destroy()
        res.send( {url: '/'} )
        res.end()
    }
})
module.exports = router