var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var router = express.Router()
var performQuery = require('../public/performajax/db')


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
        let query = 'SELECT * FROM taikhoan WHERE mataikhoan=$1'
        let values = [req.session.mataikhoan]
        let ten
        performQuery(query, values, (results)=>{
            results.rows.forEach( e => {
                ten = e.tenhienthi
            })
            let query1 = 'SELECT * FROM sanpham'
            let values1 = []
            performQuery(query1, values1, (results1)=>{
                res.send({tenhienthi: ten, sanpham: results1.rows})
                res.end()
            })
        })
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
        let query = 'SELECT * FROM taikhoan WHERE mataikhoan=$1'
        let values = [req.session.mataikhoan]
        performQuery(query, values, (results)=>{
            res.send( {data: results.rows} )
            res.end()
        })
    }
})

router.put('/canhan', (req, res)=>{
    if (req.session.tentaikhoan) {
        let query = 'UPDATE taikhoan SET tenhienthi=$1, matkhau=$2, diachi=$3, email=$4, dienthoai=$5 WHERE mataikhoan=$6'
        let values = [req.body.Tenhienthi, req.body.Matkhau, req.body.Diachi, req.body.Email, req.body.Dienthoai, req.session.mataikhoan]
        performQuery(query, values, (results)=>{
            if(results !== null){
                let query1 = 'SELECT * FROM taikhoan WHERE mataikhoan=$1'
                let values1 = [req.session.mataikhoan]
                performQuery(query1, values1, (results1)=>{
                    res.send( {update: true, dataU: results1.rows} )
                    res.end()
                })
            } else {
                res.send( {update: false} )
                res.end()
            }
        })
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

router.get('/chitietdaugia/:masp', (req, res)=>{
    if (req.session.tentaikhoan) {
        let query = 'SELECT * FROM sanpham WHERE masanpham=$1'
        let values = [req.params.masp]    
        performQuery(query, values, (results)=>{
            let query1 = 'SELECT * FROM phiendaugia WHERE masanpham=$1'
            // 'SELECT * FROM phieudaugia WHERE maphiendau=$1 and matinhtrangphieudaugia=$2'
            performQuery(query1, values, (results1)=>{
                res.send( {chitietdaugia: results.rows, phiendaugia: results1.rows} )
                res.end()
            })
        })
    }
})

router.post('/daugia', (req, res)=>{
    if(req.session.tentaikhoan){
        let query = 'UPDATE phieudaugia SET matinhtrangphieudaugia=$1 where matinhtrangphieudaugia=$2 and maphiendau=$3'
        let values = ['0','1', req.body.maphiendau]
        performQuery(query, values, (results)=>{
            let query1 = 'INSERT INTO phieudaugia(maphieudaugia, mataikhoan, maphiendau, giadau, matinhtrangphieudaugia) VALUES($1,$2,$3,$4,$5)'
            let mapd = req.body.H.toString(10) + req.body.M.toString(10) + req.body.S.toString(10) + req.session.mataikhoan
            let values1 = [mapd, req.session.mataikhoan, req.body.maphiendau, parseInt(req.body.giadau), '1']
            performQuery(query1, values1, (results1)=>{
                let query2 = 'SELECT * FROM phieudaugia WHERE maphiendau=$1 and matinhtrangphieudaugia=$2'
                let values2 = [req.body.maphiendau,'1']
                performQuery(query2, values2, (results2)=>{
                    let giadau
                    results2.rows.forEach(e=>{
                        giadau = e.giadau
                    })
                    res.send( {daugia: giadau, maphien: req.body.maphiendau} )
                    res.end()
                })
            })
        })
    }
})

router.put('/xulyphien', (req, res)=>{
    if(req.session.tentaikhoan){
        let query = 'SELECT * FROM phieudaugia WHERE matinhtrangphieudaugia=$1'
        let values = ['1']
        performQuery(query, values, (results)=>{
            
        })
        // console.log(req.body.masanpham)
        // console.log(req.body.maphien)
        // console.log(req.body.gia)
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