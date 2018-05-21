//load sản phẩm khi vào trang chính
$(document).ready((e)=>{

    $('.content-giohang').hide()
    $('.content-daugiacuatoi').hide()
    $('.content-canhan').hide()
    $('.content-lichsumua').hide()
    $('.content-chitietdaugia').hide()

    let div = $('.content-trangchu')
        div.html('')
    $.ajax({
        method:'POST',
        url: '/user',
        contentType: 'application/json',
        success: ((rs)=>{
            $('.tenhienthi').text(rs.tenhienthi)
            div.append(`
                <div class="col-sm-4 col-md-2">
                    <div class="thumbnail">
                        <a class="btnchitietdaugia" href="">
                            <img src="../images/ytb.jpg" alt="product">
                        </a>
                        <div class="caption">
                            <center>
                                <p><b class="countdown-time-home">00:00:00</b></p>
                                <p><b class="price-now-home">20.000 đ</b></p>
                                <p><a href="" class="btn btn-danger btnchitietdaugia" role="button">Đấu giá ngay</a></p>
                            </center>
                        </div>
                    </div>
                </div>
            `)
            //page chi tiết đấu giá
            $('.btnchitietdaugia').click((e)=>{
                e.preventDefault()
        
                $('.content-giohang').hide()
                $('.content-daugiacuatoi').hide()
                $('.content-canhan').hide()
                $('.content-lichsumua').hide()
                $('.content-trangchu').hide()
                $('.content-chitietdaugia').show()
        
                let divchitiet = $('.content-chitietdaugia')
                    divchitiet.html('')

                    divchitiet.append(`
                        <div class="thumbnail col-md-4 col-sm-6 col-xs-12 image-product">
                            <img src="../images/product.jpg" alt="" width="350">
                        </div>
                        <div class="col-md-4 col-sm-6 col-xs-12 information-product">
                            <p>
                                <center><h4 class="tensanpham"></h4></center>
                                <br>
                                <div class="dacta"></div>
                            </p>
                            <div class="alert alert-danger notification-product" role="alert">
                                <a href="#" class="alert-link">...Thông báo</a>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12 col-xs-12 by-product">
                            <p><center>Người thắng hiện tại</center></p>
                            <p><center><i class="fa fa-trophy fa-lg winner-chitietdaugia" aria-hidden="true"></i> <b class="winner-chitietdaugia">Chí Thông</b></center></p>
                            <hr>
                            <div class="row">
                                <div class="col-xs-6 col-md-6 col-sm-6">
                                    <div>
                                        <center>
                                            Kết thúc trong:
                                            <p class="countdown-time-chitietdaugia">00:00:00</p>
                                        </center>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-md-6 col-sm-6">
                                    <div>
                                        <center>
                                            Giá hiện tại
                                            <p class="pricenow-chitietdaugia">20.000.000 đ</p>
                                        </center>    
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row choose-price">
                                <div class="col-xs-12  col-md-8 col-sm-8 col-md-offset-2 col-sm-offset-2">
                                    <center>
                                        <p>
                                            Đấu giá ngay:
                                        </p>
                                        <input id="chongiadau" type="number" value="" name="chongiadau">
                                    </center>
                                </div>
                            </div>
                            <br>
                            <center>
                                <button type="button" class="btn btn-danger btn-daugia-chitietdaugia">Đấu giá</button>
                            </center>
                        </div>
                    `)
                    $(()=>{
                        $('#chongiadau').TouchSpin({
                            min: 0,
                            max: 1000000000,
                            initval: 0,
                            stepinterval: 50,
                            maxboostedstep: 10000000,
                            // prefix: 'đ',
                            postfix: 'đ'
                        })
                    })
                    

                $.ajax({
                    method: 'GET',
                    url: '/user/chitietdaugia', // + rs.masanpham
                    contentType: 'application/json',
                    success: ((rs1)=>{
                        $('.tensanpham').text(rs1.chitiet)
                        $('.dacta').text(rs1.chitiet)
                    })
                })
            })
        })
    })
})

    

//tới trang chính khí click logo
$('.logo').click((e)=>{
    e.preventDefault()
    $('.content-daugiacuatoi').hide()
    $('.content-lichsumua').hide()
    $('.content-giohang').hide()
    $('.content-chitietdaugia').hide()
    $('.content-canhan').hide()
    $('.content-trangchu').show()
})
//page giỏ hàng
$('.btngiohang').click((e)=>{
    e.preventDefault()

    $('.content-daugiacuatoi').hide()
    $('.content-lichsumua').hide()
    $('.content-canhan').hide()
    $('.content-chitietdaugia').hide()
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
    //quay về trang chính từ trang giỏ hàng
    $('.linkdautiep').click((e)=>{
        e.preventDefault()

        $('.content-daugiacuatoi').hide()
        $('.content-lichsumua').hide()
        $('.content-giohang').hide()
        $('.content-chitietdaugia').hide()
        $('.content-canhan').hide()
        $('.content-trangchu').show()
    })
})
//page đấu giá của tôi
$('.btndaugiacuatoi').click((e)=>{
    e.preventDefault()

    $('.content-lichsumua').hide()
    $('.content-trangchu').hide()
    $('.content-canhan').hide()
    $('.content-chitietdaugia').hide()
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
    //quay về trang chính từ trang đấu giá của tôi
    $('.linkdautiep').click((e)=>{
        e.preventDefault()

        $('.content-daugiacuatoi').hide()
        $('.content-lichsumua').hide()
        $('.content-canhan').hide()
        $('.content-chitietdaugia').hide()
        $('.content-giohang').hide()
        $('.content-trangchu').show()
    })
})
//page cá nhân
$('.btncanhan').click((e)=>{
    e.preventDefault()

    $('.content-daugiacuatoi').hide()
    $('.content-lichsumua').hide()
    $('.content-giohang').hide()
    $('.content-chitietdaugia').hide()
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
//page lịch sử mua
$('.btnlichsumua').click((e)=>{
    e.preventDefault()

    $('.content-daugiacuatoi').hide()
    $('.content-giohang').hide()
    $('.content-trangchu').hide()
    $('.content-chitietdaugia').hide()
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
