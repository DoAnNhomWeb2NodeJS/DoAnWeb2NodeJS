$(document).ready((e)=>{

    $('.content-giohang').hide()
    $('.content-daugiacuatoi').hide()
    $('.content-canhan').hide()
    $('.content-lichsumua').hide()

    let div = $('.content-trangchu')
        div.html('')
    $.ajax({
        method:'POST',
        url: '/user',
        contentType: 'application/json',
        success: ((rs)=>{
            $('.tenhienthi').text(rs.tenhienthi)
            div.append('\
                    <div class="col-sm-4 col-md-2">\
                        <div class="thumbnail">\
                            <a href="chitietdaugia">\
                                <img src="" alt="product">\
                            </a>\
                            <div class="caption">\
                                <center>\
                                    <p><b class="countdown-time-home">00:00:00</b></p>\
                                    <p><b class="price-now-home">20.000 đ</b></p>\
                                    <p><a href="chitietdaugia" class="btn btn-danger" role="button">Đấu giá ngay</a></p>\
                                </center>\
                            </div>\
                        </div>\
                    </div>\
                ') 
        })
    })
})

$('.logo').click((e)=>{
    e.preventDefault()
    $('.content-daugiacuatoi').hide()
    $('.content-lichsumua').hide()
    $('.content-giohang').hide()
    $('.content-canhan').hide()
    $('.content-trangchu').show()
})

$('.btngiohang').click((e)=>{
    e.preventDefault()

    $('.content-daugiacuatoi').hide()
    $('.content-lichsumua').hide()
    $('.content-canhan').hide()
    $('.content-trangchu').hide()
    $('.content-giohang').show()

    let div = $('.content-giohang')
        div.html('')

    div.append(`
        <div class="col-sm-12 col-md-12 col-xs-12">
            <ul class="nav nav-pills">
                <li class="linkdautiep"> <a href=""><< Đấu giá sản phảm khác </a></li>
            </ul
        </div>
        <br>
    </div>
    <div class="panel-body row">
        <div class="col-sm-6 col-md-7 col-xs-12 col-md-offset-1 col-sm-offset-1">
            <table class="table">
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Tên</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                    </tr>
                </thead>
                <tbody class="tbody-giohang"></tbody>
            </table>
        </div>
        <div class="panel panel-default col-sm-5 col-md-3 col-xs-12">
            <div class="panel-body">
                <table class="table">
                    <tr>
                        <th><center><h4>Thành tiền</h4></center></th>
                        <th><center><h4 class="thanhtien-giohang">200.000đ</h4></center></th>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <br>
                            <center><button type="button" class="btn btn-danger btn-dathang-giohang">Đặt hàng</button></center>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    `)
    
    let tbodygiohang = $('.tbody-giohang')
        tbodygiohang.html('')

    $.ajax({
        method: 'GET',
        url: '/user/giohang',
        contentType: 'application/json',
        success: ((rs)=>{
            // rs.giohang.forEach((a) => {
                tbodygiohang.append(`
                    <tr>
                        <td><img src="../images/product.jpg" alt="" width="75"></td>
                        <td>Face face</td>
                        <td>10</td>
                        <td>2000</td>
                    </tr>
                `)
            // })
        })
    })

    $('.linkdautiep').click((e)=>{
        e.preventDefault()

        $('.content-daugiacuatoi').hide()
        $('.content-lichsumua').hide()
        $('.content-giohang').hide()
        $('.content-canhan').hide()
        $('.content-trangchu').show()
    })
})

$('.btndaugiacuatoi').click((e)=>{
    e.preventDefault()

    $('.content-lichsumua').hide()
    $('.content-trangchu').hide()
    $('.content-canhan').hide()
    $('.content-giohang').hide()
    $('.content-daugiacuatoi').show()

    let div = $('.content-daugiacuatoi')
        div.html('')

        div.append(`
                <div class="col-sm-12 col-md-12 col-xs-12">
                    <ul class="nav nav-pills">
                        <li class="linkdautiep"> <a href=""><< Đấu giá sản phảm khác </a></li>
                    </ul
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-8 col-sm-8 col-xs-8 col-md-offset-2 col-xs-offset-2 col-sm-offset-2">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Giá thầu cao nhất</th>
                                <th>Thời gian hoàn thành</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody class="tbody-daugiacuatoi"></tbody>
                    </table>
                </div>
        `)

    let tbodydaugiacuatoi = $('.tbody-daugiacuatoi')
        tbodydaugiacuatoi.html('')

    $.ajax({
        method: 'GET',
        url: '/user/daugiacuatoi',
        contentType: 'application/json',
        success: ((rs)=>{
            // rs.daugiacuatoi.forEach((a) => {
                tbodydaugiacuatoi.append(`
                    <tr>
                        <td>
                            <img src="../images/product.jpg" alt="" width="75">
                            <p>Tên sản phẩm</p>
                        </td>
                        <td>100.000</td>
                        <td>00:00:00 01/01/2000</td>
                        <td>Thành công</td>
                    </tr>
                `)
            // })
        })
    })

    $('.linkdautiep').click((e)=>{
        e.preventDefault()

        $('.content-daugiacuatoi').hide()
        $('.content-lichsumua').hide()
        $('.content-canhan').hide()
        $('.content-giohang').hide()
        $('.content-trangchu').show()
    })
})

$('.btncanhan').click((e)=>{
    e.preventDefault()

    $('.content-daugiacuatoi').hide()
    $('.content-lichsumua').hide()
    $('.content-giohang').hide()
    $('.content-trangchu').hide()
    $('.content-canhan').show()

    let div = $('.content-canhan')
        div.html('')

    $.ajax({
        method: 'GET',
        url: 'user/canhan',
        contentType: 'application/json',
        success: ((rs)=>{
            div.append(`
                <div class="col-md-6 col-sm-8 col-xs-8 col-md-offset-3 col-xs-offset-2 col-sm-offset-2">
                    <form action="" method="">
                        <p>
                            <h3><center>Thông tin cá nhân</center></h3>
                        </p>
                        <br>
                        <div class="input-group">
                            <input type="text" class="form-control tenhienthi" placeholder="vd: nlcthong">
                            <span class="input-group-addon">Tên hiển thị</span>
                        </div>
                        <br>
                        <div class="input-group">
                            <input type="password" class="form-control matkhau" placeholder="********">
                            <span class="input-group-addon">Mật khẩu</span>
                        </div>
                        <br>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="vd: 156/4 Tô hiến thành">
                            <span class="input-group-addon">Địa chỉ</span>
                        </div>
                        <br>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="vd: nlcthong1997@gmail.com">
                            <span class="input-group-addon">Email</span>
                        </div>
                        <br>
                        <div class="input-group">
                            <input type="number" class="form-control" placeholder="vd: 01693438271">
                            <span class="input-group-addon">Di động</span>
                        </div>
                        <br>
                        <center><button type="button" class="btn btn-success btn-chinhsua-canhan">Chỉnh sửa</button></center>
                    </form>
                </div> 
            `)
        })
    })
})

$('.btnlichsumua').click((e)=>{
    e.preventDefault()

    $('.content-daugiacuatoi').hide()
    $('.content-giohang').hide()
    $('.content-trangchu').hide()
    $('.content-canhan').hide()
    $('.content-lichsumua').show()

    let div = $('.content-lichsumua')
        div.html('')

        div.append(`
            <div class="col-md-8 col-sm-8 col-xs-12 col-md-offset-2 col-sm-offset-2">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Mã hóa đơn</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody class="tbodylichsumua"></tbody>
                </table>
            </div>
        `)
    
    let tbodylichsumua = $('.tbodylichsumua')
        tbodylichsumua.html()

    $.ajax({
        method: 'GET',
        url: '/user/lichsumua',
        contentType: 'application/json',
        success: ((rs)=>{
            rs.lichsumua1.forEach((a) => {
                tbodylichsumua.append(`
                <tr>
                    <td><b class="mahoadon-lichsumua">Hóa đơn: 01</b></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                `)
                rs.lichsumua2.forEach((b) => { 
                    tbodylichsumua.append(`
                        <tr>
                            <td></td>
                            <td>Face ID</td>
                            <td>6</td>
                            <td>5000</td>
                            <td>30000</td>
                        </tr>
                    `)
                })
            })
        })
    })
})

$('.btndangxuat').click((e)=>{
    $.ajax({
        method: 'GET',
        url: '/user/logout',
        contentType: 'application/json',
        success: ((rs)=>{
            window.location = rs.url
        })
    })
})
