$(document).ready((e)=>{
    // $('.content-main-2').hide()
    var div = $('.content-main-1')
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
    $('.content-main-1').hide()
    $('.content-main-2').show()
    
})