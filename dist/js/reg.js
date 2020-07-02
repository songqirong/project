"use strict";

$('.reg').click(function () {
  $.ajax({
    type: 'get',
    url: '../php/user.php',
    data: {
      'user': $('.user').val(),
      'pass': $('.pass').val(),
      'type': 'add'
    },
    dataType: 'json',
    success: function success(data) {
      if (data.status == 200) {
        alert(data.msg);
        location.href = '../html/login.html';
      } else {
        alert(data.msg);
      }
    },
    error: function error(data) {
      console.log(data);
    }
  });
});