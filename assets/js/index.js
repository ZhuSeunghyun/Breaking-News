$(function () {
    getUserInfo()
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        Headers: {
            'Authorization': localStorage.getItem('token'),
        },
        success: function (res) {
            console.log(res);
        }
    })
}