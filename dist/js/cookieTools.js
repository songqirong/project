"use strict";

function setCookie(object) {
  if (!object.key || !object.value) {
    throw new Error('传入参数key或者value不能为空');
  }

  object.domain = object.domain || '';
  object.path = object.path || '';
  object.days = object.days || 0;

  if (object.days !== 0) {
    var d = new Date();
    d.setDate(parseInt(d.getDate()) + parseInt(object.days));
    document.cookie = "".concat(object.key, " = ").concat(escape(object.value), ";domain = ").concat(object.domain, ";path = ").concat(object.path, ";expires = ").concat(d);
  } else {
    document.cookie = "".concat(object.key, " = ").concat(escape(object.value), ";domain = ").concat(object.domain, ";path = ").concat(object.path, ";");
  }
}

function getCookie(key) {
  var cookies = document.cookie;
  var arr = cookies.split("; ");

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].split("=")[0] == key) {
      return unescape(arr[i].split("=")[1]);
    }
  }

  return null;
}

function removeCookie(key) {
  setCookie({
    key: key,
    value: 'byebye',
    days: -1
  });
}

function updateCookie(object) {
  setCookie(object);
}