"use strict";

$('.inner_box .toggle_module span').click(function () {
  if ($(this).hasClass('active')) {
    $(this).text("帐号登录");
    $(this).removeClass('active');
    $(this).parent().siblings('.title').text('短信验证码登陆');
    $(this).parent().siblings('p').css("display", "block");
    $(this).parent().siblings('.input_area').children('input').attr({
      placeholder: '请输入手机号'
    });
    $(this).parent().siblings('.code_area').children('.get_code').css("display", "block");
    $(this).parent().siblings('.code_area').children('.code_txt').css({
      "width": "210px",
      "border-right": "none"
    });
    $(this).parent().siblings('.input_area').children('.phone_code').css("display", "block");
    $(this).parent().siblings('.input_area').children('.phone_txt').css({
      "width": "274px",
      "border-left": "none"
    });
    $(this).parent().siblings('.code_area').children('.code_txt').attr({
      placeholder: '请输入验证码',
      type: 'text'
    });
  } else {
    $(this).text("短信验证码登陆");
    $(this).parent().siblings('.title').text('帐号登录');
    $(this).addClass('active');
    $(this).parent().siblings('.input_area').children('input').attr({
      placeholder: '请输入帐号'
    });
    $(this).parent().siblings('p').css("display", "none");
    $(this).parent().siblings('.code_area').children('.get_code').css("display", "none");
    $(this).parent().siblings('.code_area').children('.code_txt').css({
      "width": "346px",
      "border-right": "1px solid #ccc"
    });
    $(this).parent().siblings('.input_area').children('.phone_code').css("display", "none");
    $(this).parent().siblings('.input_area').children('.phone_txt').css({
      "width": "348px",
      "border-left": "1px solid #ccc"
    });
    $(this).parent().siblings('.code_area').children('.code_txt').attr({
      placeholder: '请输入密码',
      type: 'password'
    });
  }
}); // console.log($('#denglu').get(0))

$('.reg').click(function () {
  location.href = '../html/reg.html';
});
$('.submit').click(function () {
  $.ajax({
    type: 'GET',
    url: '../php/user.php',
    data: {
      'user': $('.phone_txt').val(),
      'pass': $('.code_txt').val(),
      'type': 'login'
    },
    dataType: 'json',
    success: function success(data) {
      // let obj = JSON.parse(data);
      if (data.status == 200) {
        alert(data.msg); // location.href = "http://localhost/x3/index.html?username="+username.value;                

        if ($('#denglu').get(0).checked) {
          setCookie({
            key: 'username',
            value: $('.phone_txt').val(),
            days: '14'
          });
        } else {
          setCookie({
            key: 'username',
            value: $('.phone_txt').val()
          });
        }

        location.href = "../html/index.html";
      } else {
        alert(data.msg);
      }
    },
    error: function error(data) {
      console.log(data);
    }
  });
});