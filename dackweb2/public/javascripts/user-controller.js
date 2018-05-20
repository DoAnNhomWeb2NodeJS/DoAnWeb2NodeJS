$(document).ready((e)=>{
    // $('.content-main-2').hide()
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
$('.btngiohang').click((e)=>{
    e.preventDefault();

    $('.content-trangchu').hide()

    let div = $('.content-giohang')
        div.html('')

    div.append(`
    <div class="col-sm-12 col-md-12 col-xs-12">
    <a href="home"> < Đấu giá sản phẩm khác</a>
</div>
</div>
<div class="panel-body row">
<div class="col-sm-7 col-md-8 col-xs-12">
    <table class="table">
        <tr>
            <th>Sản phẩm</th>
            <th>Tên</th>
            <th>Số lượng</th>
            <th>Giá</th>
        </tr>`)
    
    $.ajax({
        method: 'GET',
        url: '/user/giohang',
        contentType: 'application/json',
        success: ((rs)=>{
            // rs.giohang.forEach((e) => {
                div.append(`<tr>
                <td><img src="../images/product.jpg" alt="" width="75"></td>
                <td>Face face</td>
                <td>10</td>
                <td>2000</td>
            </tr>
            <tr>
                <td><img src="../images/product.jpg" alt="" width="75"></td>
                <td>Face face</td>
                <td>10</td>
                <td>2000</td>
            </tr>`)
            // })
            div.append(`</table>
    </div>
    <div class="panel panel-default col-sm-5 col-md-4 col-xs-12">
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
        })
    })
})