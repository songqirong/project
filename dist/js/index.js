"use strict";

// require.config({
//     baseUrl:'../js',
//     paths:{
//         'jquery': ["http://libs.baidu.com/jquery/2.0.3/jquery",'jquery']//提供备用资源
//     }
// })
var oLis = document.querySelectorAll(".nav li .phone_box");
var ologo = document.querySelector("#logo");
var myTimer = null;

for (var i = 0; i < oLis.length; i++) {
  oLis[i].parentNode.onmouseover = function () {
    if (myTimer !== null) {
      clearTimeout(myTimer);
    }

    ologo.style.backgroundColor = "white";
  };

  oLis[i].parentNode.onmouseout = function () {
    myTimer = setTimeout(function () {
      ologo.style.backgroundColor = "#E4ECFF";
    }, 500);
  };
}

var oLi1 = document.querySelector('.start');
var oLi2 = document.querySelector('.end');
var remove = document.querySelector('.removeCookie'); // console.log(tocart)

remove.onclick = function () {
  removeCookie('username');
  location.reload();
};

window.onload = function () {
  if (getCookie('username')) {
    oLi1.style.display = 'none';
    oLi2.style.display = 'block';
  } else {
    oLi2.style.display = 'none';
    oLi1.style.display = 'block';
  }
};