"use strict";

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
      ologo.style.backgroundColor = "#F7F7F7";
    }, 500);
  };
}

var mySwiper = new Swiper('.swiper-container', {
  autoplay: true,
  effect: 'fade',
  speed: 2000,
  // direction: 'vertical', // 垂直切换选项
  loop: true,
  // 循环模式选项
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets'
  } // 如果需要前进后退按钮
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },
  // 如果需要滚动条
  // scrollbar: {
  // //   el: '.swiper-scrollbar',
  // },

});
$('.container').mouseover(function () {
  // values: e.clientX, e.clientY, e.pageX, e.pageY
  mySwiper.autoplay.stop();
});
$('.container').mouseout(function () {
  // values: e.clientX, e.clientY, e.pageX, e.pageY
  mySwiper.autoplay.start();
});
$.ajax({
  type: 'GET',
  url: '../php/goodsList.php',
  data: {
    'type': 'load'
  },
  dataType: 'json',
  success: function success(data) {
    // console.log(data);
    var str = '';
    $(data).each(function (index, item) {
      str += "<li>\n                    <a href=\"../html/product.html?code=".concat(item.code, "\">\n                        <div class=\"img_box\">\n                            <img src=\"../images/").concat(item.imgSrc, ".png\" alt=\"\">\n                        </div>\n                        <div class=\"content_box\">\n                            <h5>").concat(item.detail, "</h5>\n                            <p>").concat(item.norms, "</p>\n                            <h6>\uFFE5 ").concat(item.price, ".00</h6>\n                        </div>\n                    </a>\n                </li>"); // console.log(item.code)
    });
    $('.list_box1').html(str);
  }
});