//load sản phẩm khi vào trang chính
$(document).ready((e)=>{
    // e.preventDefault()
    $('.content-giohang').hide()
    $('.content-daugiacuatoi').hide()
    $('.content-canhan').hide()
    $('.content-lichsumua').hide()
    $('.content-chitietdaugia').hide()

    let refreshTime = 30,   //Total refresh time
        failTime = 30,      //Refresh time 
        timer,              //Holds the interval
        counter;            //Holds the count number (Seconds)
    
    let countDown = () => {
        $(".timer").html(counter+" giây");
        if(counter == 0){
            counter = failTime;
            // console.log('successful')
        }else{
            counter--;
        }
    }
        
    counter = refreshTime;
    $('.timer').text(counter+" giây");
    timer = setInterval(countDown, 1000)


    let div = $('.content-trangchu')
        div.html('')
    $.ajax({
        method:'POST',
        url: '/user',
        contentType: 'application/json',
        success: ((rs)=>{
            $('.tenhienthi').text(rs.tenhienthi)
            rs.sanpham.forEach((a)=>{
                div.append(`
                    <div class="col-sm-4 col-md-2">
                        <div class="thumbnail">
                            <a class="btnchitietdaugia" href="">
                                <img src="../images/ytb.jpg" alt="product">
                            </a>
                            <div class="caption">
                                <center>
                                    <p><b class="countdown-time-home timer"></b></p>
                                    <p><a href="" class="btn btn-danger btnchitietdaugia" role="button">Đấu giá ngay</a></p>
                                    <input type="hidden" class="masanpham" value="${a['masanpham']}">
                                </center>
                            </div>
                        </div>
                        <input type="hidden" class="masanpham" value="${a['masanpham']}">
                    </div>
                `)
            })
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
                                            <p class="countdown-time-chitietdaugia timer"></p>
                                        </center>
                                    </div>
                                </div>
                                <div class="col-xs-6 col-md-6 col-sm-6">
                                    <div>
                                        <center>
                                            Giá hiện tại
                                            <p class="giahientai"></p>
                                            <input id="giahientai" type="text" value="" name="giahientai">
                                            <input id="giathapnhat" type="hidden" value="" name="giathapnhat">
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
                                        <input id="maphiendau" type="hidden" value="" name="maphiendau">
                                        <input id="chongiadau" type="number" value="" name="chongiadau">
                                    </center>
                                </div>
                            </div>
                            <br>
                            <center>
                                <button type="button" class="btn btn-danger btndaugia">Đấu giá</button>
                            </center>
                        </div>
                    `)
                    //bootstrap input giá đấu
                    $(()=>{
                        $('#chongiadau').TouchSpin({
                            min: 0,
                            max: 1000000000,
                            initval: 0,
                            stepinterval: 50,
                            maxboostedstep: 10000000,
                            postfix: 'đ'
                        })   
                    })
                
                let r = $(e.target).parent().parent()
                let masp = r.find('.masanpham').val()
                
                $.ajax({
                    method: 'GET',
                    url: '/user/chitietdaugia/'+ masp,
                    contentType: 'application/json',
                    success: ((rs1)=>{
                        rs1.chitietdaugia.forEach((a1)=>{
                            $('.tensanpham').text(a1.tensanpham)
                            $('.dacta').html(a1.dacta)
                        })
                        rs1.phiendaugia.forEach((a1)=>{
                            $('#maphiendau').val(a1.maphiendau)
                            $('#giathapnhat').val(a1.giathapnhat)
                            if(a1.giahientai == null){
                                $('.giahientai').text(a1.giathapnhat + " đ")
                                $('#giahientai').val(a1.giathapnhat) 
                            } else {
                                $('.giahientai').text(a1.giahientai + " đ")
                                $('#giahientai').val(a1.giahientai) 
                            }
                        })
                    })
                })

                //click đấu giá
                $('.btndaugia').click((e)=>{
                    e.preventDefault()

                    let row = $(e.target).parent().parent()
                    let giadau = row.find('#chongiadau').val()
                    let giahientai = row.find('#giahientai').val()

                    if(giadau <= (parseInt(giahientai) + 5000)){
                        giadau = parseInt(giahientai) + 5000
                        alert('Bạn vừa đấu với giá: '+ giadau +'. Vì giá mới phải lớn hơn giá hiện tại 5000')
                    } else {
                        giadau = giadau
                    }
                    let maphiendau = row.find('#maphiendau').val()
                    let today = new Date();
                    let h = today.getHours();
                    let m = today.getMinutes();
                    let s = today.getSeconds();
                    
                    $.ajax({
                        method: 'POST',
                        url: 'user/daugia',
                        contentType: 'application/json',
                        data: JSON.stringify( {maphiendau: maphiendau, giadau: giadau, H: h, M: m, S: s} ),
                        success: ((rs)=>{
                            $('.giahientai').text(rs.daugia + " đ")
                            $('#giahientai').val(rs.daugia)
                            giahientainew = rs.daugia
                            maphien = rs.maphien
                            giathapnhat = $('#giathapnhat').val()
                            alert('Đấu giá thành công')
                        })
                    })                  
                })
                
                let checkTime = () => {
                    if(counter == 0 && giahientai > giathapnhat){
                        $.ajax({
                            method: 'PUT',
                            url: 'user/xulyphien',
                            contentType: 'application/json',
                            data: JSON.stringify( {gia: giahientainew, maphien: maphien} )
                        })
                        clearInterval(kt)
                        alert('Phiên đấu này đã kết thúc')
                    }
                }
                kt = setInterval(checkTime, 1000)  
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
            rs.data.forEach((a)=>{
                div.append(`
                    <div class="col-md-6 col-sm-8 col-xs-8 col-md-offset-3 col-xs-offset-2 col-sm-offset-2">
                        <form class="canhan">
                            <p>
                                <h3><center>Thông tin cá nhân</center></h3>
                            </p>
                            <br>
                            <div class="input-group">
                                <input type="text" class="form-control tenhienthi" value="${a['tenhienthi']}">
                                <span class="input-group-addon">Tên hiển thị</span>
                            </div>
                            <br>
                            <div class="input-group">
                                <input type="password" class="form-control matkhau" value="${a['matkhau']}">
                                <span class="input-group-addon">Mật khẩu</span>
                            </div>
                            <br>
                            <div class="input-group">
                                <input type="text" class="form-control diachi" value="${a['diachi']}">
                                <span class="input-group-addon">Địa chỉ</span>
                            </div>
                            <br>
                            <div class="input-group">
                                <input type="text" class="form-control email" value="${a['email']}">
                                <span class="input-group-addon">Email</span>
                            </div>
                            <br>
                            <div class="input-group">
                                <input type="number" class="form-control dienthoai" value="${a['dienthoai']}">
                                <span class="input-group-addon">Di động</span>
                            </div>
                            <br>
                            <center><button type="button" class="btn btn-success btnchinhsuacanhan">Chỉnh sửa</button></center>
                        </form>
                    </div> 
                `)
            })
            $('.btnchinhsuacanhan').click((e)=>{
                e.preventDefault()

                let row = $(e.target).parent().parent()

                let tenhienthiP = row.find('.tenhienthi').val(),
                    matkhauP = row.find('.matkhau').val(),
                    diachiP = row.find('.diachi').val(),
                    emailP = row.find('.email').val(),
                    dienthoaiP = row.find('.dienthoai').val(), 
        
                data = {
                    Tenhienthi: tenhienthiP,
                    Matkhau: matkhauP,
                    Diachi: diachiP,
                    Email: emailP,
                    Dienthoai: dienthoaiP
                }
        
                $.ajax({
                    method: 'PUT',
                    url: '/user/canhan',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: ((rs)=>{
                        if(rs.update == true){
                            alert('Cập nhật thành công')
                        } else {
                            alert('Cập nhật lỗi')
                        }
                    })
                })
            })
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
