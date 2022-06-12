$(function () {
  const form = layui.form;
  // 获取 表格数据
  const initArtCateList = () => {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: (res) => {
        if (res.status !== 0) return layer.msg('获取文章列表x失败');
        // 调用 template
        const htmlStr = template('tpl-table', res);
        $('tbody').empty().html(htmlStr);
      },
    });
  };
  let indexAdd = null;
  $('#btnAddCate').click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html(),
    });
  });

  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('新增分类失败！');
        initArtCateList();
        layer.msg('新增分类成功！');
        layer.close(indexAdd);
      },
    });
  });

  let indexEdit = null;
  //事件委托
  $('tbody').on('click', '.btn-edit', function () {
    const id = $(this).attr('data-id');
    // 弹出修改文章分类的弹窗
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html(),
    });
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: (res) => {
        form.val('form-edit', res.data);
      },
    });
  });

  // 更新文章分类
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败！');
        }

        layer.msg('更新分类数据成功！');

        layer.close(indexEdit);

        initArtCateList();
      },
    });
  });
  // 删除文章分类
  $('tbody').on('click', '.btn-delete', function () {
    const id = $(this).attr('data-id');
    // 提示用户是否删除
    layer.confirm('确定删除吗？', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！');
          }
          layer.msg('删除分类成功！');
          layer.close(index);
          initArtCateList();
        },
      });
    });
  });
  initArtCateList();
});
