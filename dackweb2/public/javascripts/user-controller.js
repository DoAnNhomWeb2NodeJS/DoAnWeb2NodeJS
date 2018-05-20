$(document).ready((e)=>{

    $('.content-giohang').hide()
    $('.content-daugiacuatoi').hide()
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
    $('.content-trangchu').show()
})

$('.btngiohang').click((e)=>{
    e.preventDefault()

    $('.content-daugiacuatoi').hide()
    $('.content-lichsumua').hide()
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
        $('.content-trangchu').show()
    })
})

$('.btndaugiacuatoi').click((e)=>{
    e.preventDefault()

    $('.content-lichsumua').hide()
    $('.content-trangchu').hide()
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
        $('.content-giohang').hide()
        $('.content-trangchu').show()
    })
})

