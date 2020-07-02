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

var href = location.search;
var reg = /code=(\d+)/;
var res = href.match(reg);
var code = res[1];
console.log(code);
$.ajax({
  type: 'GET',
  url: '../php/goodsList.php',
  data: {
    'type': 'select',
    'code': code
  },
  dataType: 'json',
  success: function success(data) {
    // console.log(data)
    var obj = data[0];
    var str = "\n                    <dt class=\"float_left\">\n                        <img src=\"../images/".concat(obj.imgSrc, ".png\" alt=\"\">\n                    </dt>\n                    <dd class=\"float_left\">\n                        <h4>").concat(obj.detail, "</h4>\n                        <h4>").concat(obj.norms, "</h4>\n                        <p><span>\u3010\u96E8\u5B9A\u4EAB24\u671F\u514D\u606F\uFF0C\u52A0\u8D60\u534A\u5E74V\u4EAB\u65E0\u5FE7,\u9AD8\u7B49\u7EA7\u4F1A\u5458\u9650\u91CF\u8D60\u80CC\u5305\uFF0C7\u670811\u65E5\u96F6\u70B9\u5F00\u552E\u3011</span> \u8D85\u6E051\u4EBF\u6A21\u5F0F\u3001\u9AD8\u901A\u9A81\u9F99865\u3001120HZ\u5237\u65B0\u7387\u3001240HZ\u91C7\u6837\u7387|\u53CC\u6A215G\u5168\u7F51\u901A</p>\n                        <div class=\"sell\">\n                            <h5>\u552E\u4EF7\uFF1A").concat(obj.price, ".00</h5>\n                            <h6>\u5546\u54C1\u652F\u6301\uFF1A &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>\u221A</i>\u82B1\u5457\u5206\u671F &nbsp;&nbsp; <i>\u221A</i>\u4EE5\u65E7\u6362\u65B0</h6>\n                        </div>\n                        <div class=\"balance\">\n                            <button>\u52A0\u5165\u8D2D\u7269\u8F66</button><button>\u6211\u7684\u8D2D\u7269\u8F66</button>\n                        </div>\n                    </dd>\n        ");
    $('.box').html(str);
    $('.balance button').eq(0).click(function () {
      $.ajax({
        type: 'get',
        url: '../php/cartlist.php',
        data: {
          'type': 'add',
          'code': code,
          'imgSrc': obj.imgSrc,
          'detail': obj.detail,
          'norms': obj.norms,
          'price': obj.price,
          'num': obj.num,
          'preferential': obj.preferential
        },
        dataType: 'json',
        success: function success(data) {
          // console.log(data);
          if (data.status == '200') {
            alert(data.msg);
          } else {
            alert(data.msg);
          }
        }
      });
    });
    $('.balance button').eq(1).click(function () {
      location.href = '../html/mycart.html';
    });
  }
});