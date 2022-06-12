function getUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    success: (res) => {
      if (res.status !== 0) return layer.msg(res.message);
      renderAvatar(res.data);
    },
    // complete: (res) => {
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === '身份认证失败！'
    //   ) {
    //     localStorage.removeItem('token');
    //     location.href = '/login.html';
    //   }
    // },
  });
}
const renderAvatar = (user) => {
  const name = user.nickname || user.username;
  $('#welcome').html(`欢迎${name}`);
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    $('.layui-nav-img').hide();
    let first = name[0].toUpperCase();
    $('.text-avatar').html(first).show();
  }
};

$('#btnLogout').click(() => {
  layui.layer.confirm(
    '是否退出登录？',
    { icon: 3, title: '提示' },
    function (index) {
      localStorage.removeItem('token');
      location.href = '/login.html';
    }
  );
});


getUserInfo();
function change() {
  $('#change').addClass('layui-this').next().removeClass('layui-this');
}