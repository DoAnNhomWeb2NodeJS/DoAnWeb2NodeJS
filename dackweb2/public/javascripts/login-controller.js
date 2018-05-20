$(document).ready((e)=>{
    $('#loginform').on('submit', (e1)=>{
        e1.preventDefault() //không load lại form nếu làm việc với form

        let username = $('#login-username')
        let password = $('#login-password')
        let remember = $('#login-remember')

        let data = { 
            Username: username.val(),
            Password: password.val(),
            Remember: remember.prop('checked')
        }

        $.ajax({
            method: 'POST',
            url: '/',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: ((rs)=>{
                if(rs.login === 1){
                    window.location = '/admin'
                }
                if(rs.login === 0){
                    window.location = '/user'
                }
                if(rs.login === false){
                    window.location = '/'
                }
            })
        })
    })
})