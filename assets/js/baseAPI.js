$.ajaxPrefilter((options) => {
  options.url = 'http://big-event-api-t.itheima.net' + options.url;
  if (options.url.includes('/my/')) {
    options.headers = {
      Authorization: localStorage.getItem('token'),
    };
  }
  options.complete = (res) => {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === '身份认证失败！'
    ) {
      localStorage.removeItem('token');
      location.href = '/login.html';
    }
  };
});
