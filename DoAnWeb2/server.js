var express = require('express')
var app = express()

// khai báo thư mục
app.use('/assets', express.static('assets'))
app.use('/images', express.static('images'))

//route Đăng nhập
app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/views/'+'dangnhap.html')
})
//route Đăng ký
app.get('/dangky', (req,res)=>{
    res.sendFile(__dirname+'/views/'+'dangky.html')
})
// ------------Nội dung hiển thị-------------
//route trang chính, trang đấu giá
app.get('/home', (req,res)=>{
    res.sendFile(__dirname+'/views/'+'home.html')
})
//route trang chi tiết sản phẩm đấu giá
app.get('/chitietdaugia', (req,res)=>{
    res.sendFile(__dirname+'/views/'+'chitietdaugia.html')
})
//----------Danh mục header------------------
//route trang giỏ hàng
app.get('/giohang', (req,res)=>{
    res.sendFile(__dirname+'/views/'+'giohang.html')
})
//route trang đấu giá của tối
app.get('/daugiacuatoi', (req,res)=>{
    res.sendFile(__dirname+'/views/'+'daugiacuatoi.html')
})
//-----------Thông tin USER----------------
//route trang thông tin cá nhân
app.get('/canhan', (req,res)=>{
    res.sendFile(__dirname+'/views/'+'canhan.html')
})
//route trang lịch sử mua hàng
app.get('/lichsumua', (req,res)=>{
    res.sendFile(__dirname+'/views/'+'lichsumua.html')
})
//route trang quản lý sản phẩm
app.get('/quanlysanpham-them', (req,res)=>{
    res.sendFile(__dirname+'/views/'+'quanlysanpham-them.html')
})
app.get('/quanlysanpham-chinhsua', (req,res)=>{
    res.sendFile(__dirname+'/views/'+'quanlysanpham-chinhsua.html')
})

app.listen(3000, ()=>{
    console.log("Server is running port 3000")
})