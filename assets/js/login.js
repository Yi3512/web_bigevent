// 点击去注册账号让 登录框隐藏，注册框显示
$('#link_reg').click(() => {
  $('.login-box').hide();
  $('.reg-box').show();
});
// 点击去登录让 注册框隐藏，登录框显示
$('#link_login').click(() => {
  $('.login-box').show();
  $('.reg-box').hide();
});

// 从 LayUI 中获取 form 对象
const form = layui.form;
// 通过 form.verify() 方法自定义校验规则
form.verify({
  // 自定义一个叫 pwd 的校验规则
  pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
  // 校验两次密码是否一致的规则
  repwd: (val) => {
    const pwd = $('.reg-box [name=password]').val();
    if (pwd !== val) return '两次密码不一致';
  },
});
const layer = layui.layer;
// const baseUrl = 'http://www.liulongbin.top:3007';
$('#form_reg').submit((e) => {
  e.preventDefault();
  $.ajax({
    type: 'POST',
    url: '/api/reguser',
    data: {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val(),
    },
    success: (res) => {
      if (res.status !== 0) return layer.msg(res.message);
      layer.msg(res.message);
      $('#link_login').click();
    },
  });
});
// 监听登录表单，发送登录请求
$('#form_login').submit((e) => {
  e.preventDefault();
  $.ajax({
    type: 'POST',
    url: '/api/login',
    data: $('#form_login').serialize(),
    success: (res) => {
      if (res.status !== 0) return layer.msg(res.message);
      layer.msg('登录成功！');
      // 将登录成功得到的 token 字符串，保存到 localStorage 中
      localStorage.setItem('token', res.token);
      // 跳转到主页
      location.href = '/index.html';
    },
  });
});
