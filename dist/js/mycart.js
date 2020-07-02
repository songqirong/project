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

jQuery.fn.extend({
  // 参数：
  // $subCheck：子复选框
  // $unBtn:反选按钮
  check: function check($subCheck, $unBtn) {
    var _this = this;

    //1、 点击全选复选框
    this.click(function () {
      $subCheck.prop("checked", this.checked);
    });

    if ($unBtn) {
      // 点击反选按钮
      $unBtn.click(function () {
        $subCheck.each(function () {
          // this: 循环时的当前元素
          this.checked = !this.checked;
        });
        subChangeFather();
      });
    } // 点击子复选框


    $subCheck.click(function () {
      subChangeFather();
    });

    var subChangeFather = function subChangeFather() {
      // 循环所有的复选框，看看是不是都选中了呢
      var allCheck = true; //假定都选中了

      $subCheck.each(function () {
        // this:循环时的当前dom对象。
        if (this.checked != true) {
          allCheck = false;
        }
      });

      _this.prop("checked", allCheck);
    };
  }
});
$.ajax({
  type: 'get',
  url: '../php/cartlist.php',
  data: {
    'type': 'select'
  },
  dataType: 'json',
  success: function success(data) {
    // console.log(data)
    var str = '';

    if (data.length > 0) {
      var strHeader = "\n                <div class=\"goodsMsg\">\n                    <input type=\"checkbox\" name=\"\" id=\"checkAll\"><label for=\"checkAll\">\u5168\u9009</label>\n                    <span>\u5546\u54C1\u540D\u79F0</span>\n                    <span>\u4EF7\u683C\uFF08\u5143\uFF09</span>\n                    <span>\u6570\u91CF</span>\n                    <span>\u4F18\u60E0</span>\n                    <span>\u8D60\u9001\u79EF\u5206</span>\n                    <span>\u5C0F\u8BA1</span>\n                    <span>\u64CD\u4F5C</span>\n                </div>\n                <ul class=\"goodslist\">\n        ";
      var strmiddle = '';
      data.forEach(function (item, index) {
        var fact = (item.price - item.preferential) * item.num;
        var less = item.preferential * item.num;
        strmiddle += "\n                \n                    <li code=\"".concat(item.code, "\">\n                        <input type=\"checkbox\" name=\" \">\n                        <div class=\"img_box\">\n                            <a href=\"\">\n                                <img src=\"../images/").concat(item.imgSrc, ".png\">\n                            </a>\n                        </div>\n                        <div class=\"present\">\n                            <a href=\"\">").concat(item.detail, " ").concat(item.norms, " \u51B0\u5C9B\u604B\u6B4C</a><br>\n                            <span>\u989C\u8272:\u51B0\u5C9B\u604B\u6B4C</span>\n                        </div>\n                        <p>").concat(item.price, ".00</p>\n                        <div class=\"num\">\n                            <span class=\"reduceBtn\">-</span><em>").concat(item.num, "</em><span class=\"addBtn\">+</span>\n                        </div>\n                        <b>").concat(less, "</b>\n                        <i>").concat(fact, "</i>\n                        <h4>").concat(fact, ".00</h4>\n                        <div class=\"del\">\n                            <button class=\"delBtn\">\u5220\u9664</button>\n                        </div>\n                    </li>\n                ");
      });
      var strfooter = " </ul>\n            <div class=\"total\">\n                <div class=\"xuan\">\n                    <input type=\"checkbox\" name=\"\" id=\"uncheck\"><label for=\"uncheck\">\u53CD\u9009</label>\n                </div>\n                <span class=\"delAll\">\u5220\u9664\u9009\u4E2D\u7684\u5546\u54C1</span>\n                <span>\u79FB\u5165\u6536\u85CF\u5939</span>\n                <div class=\"money\">\n                    <p>\u5DF2\u9009\u5546\u54C1<em>0</em>\u4EF6\uFF0C\u5408\u8BA1\uFF08\u4E0D\u542B\u8FD0\u8D39\uFF09\uFF1A<b>\uFFE50.00</b></p>\n                    <h3>\uFF08\u5546\u54C1\u603B\u4EF7 \uFF1A<em>\uFFE50.00</em> \u4F18\u60E0\uFF1A<i>\uFFE50.00</i>\uFF09</h3>\n                </div>\n                <div class=\"balance\">\n                    <button>\u53BB\u7ED3\u7B97</button>\n                </div>\n            </div>";
      str = strHeader + strmiddle + strfooter;
    } else {
      str = '<li style="padding-top:210px;height:290px;background-color:white;line-height:80px;text-align:center;">购物车暂无数据</li>';
    }

    $('.cart_content').html(str);
    $('#checkAll').check($(".goodslist input[type='checkbox']"), $('#uncheck'));
    $(":checkbox").click(function () {
      totalMoney();
    });
    $(".addBtn").click(function () {
      // 数量
      var count = $(this).prev().html();
      count++;
      $(this).prev().html(count);
      var preferential;
      var code = $(this).parent().parent().attr("code");
      Ajax(code, count); // console.log(code)

      $(data).each(function (index, item) {
        if (item.code == code) {
          preferential = item.preferential;
        }
      });
      var moneyless = preferential * count;
      $(this).parent().next().html(moneyless + '.00'); // 单价

      var price = $(this).parent().prev().html(); // 计算金额

      var money = price * count - moneyless;
      $(this).parent().siblings('i').html(money);
      $(this).parent().siblings('h4').html(money + '.00'); // 总金额

      totalMoney();
    });
    $(".reduceBtn").click(function () {
      // 数量
      var count = $(this).next().html();
      count--;

      if (count < 1) {
        count = 0;
      }

      $(this).next().html(count);
      var preferential;
      var code = $(this).parent().parent().attr("code");
      Ajax(code, count);
      $(data).each(function (index, item) {
        if (item.code == code) {
          preferential = item.preferential;
        }
      });
      var moneyless = preferential * count;
      $(this).parent().next().html(moneyless); // 单价

      var price = $(this).parent().prev().html(); // 计算金额

      var money = price * count - moneyless;
      $(this).parent().siblings('i').html(money);
      $(this).parent().siblings('h4').html(money + '.00'); // 同时改变当前行的复选框的状态

      if (count == 0) {
        $(this).parent().parent().find(":checkbox").prop("checked", false); // $(this).parent().parent().remove();
      } // 总金额


      totalMoney();
    });
    $(".delBtn").click(function () {
      if (confirm("亲，您真的要删除吗？")) {
        $(this).parent().parent().parent().siblings('.goodsMsg').find('input').prop("checked", false);
        $(this).parent().parent().parent().siblings('.total').find('.xuan').find(':checkbox').prop("checked", false);
        var code = $(this).parent().parent().attr("code");
        Ajax1(code);
        alert('删除商品成功');
        $(this).parent().parent().remove();
        totalMoney();

        if (!$('.cart_content').find('ul li').get(0)) {
          var _str = '<li style="padding-top:210px;height:290px;background-color:white;line-height:80px;text-align:center;">购物车暂无数据</li>';
          $('.cart_content').html(_str);
        }
      }
    });
    $(".delAll").click(function () {
      if (confirm("亲，您真的要删除吗？")) {
        var $li = $('.goodslist li');
        $li.each(function () {
          if ($(this).find("input").prop("checked")) {
            // console.log(1111)
            var code = $(this).attr("code");
            Ajax1(code);
            $(this).remove();
          }
        });
        alert('删除商品成功');
        $(this).parent().siblings('.goodsMsg').find('input').prop("checked", false);
        $(this).siblings('.xuan').find(':checkbox').prop("checked", false);
        totalMoney(); // console.log($('.cart_content').find('ul li').get(0));

        if (!$('.cart_content').find('ul li').get(0)) {
          var _str2 = '<li style="padding-top:210px;height:290px;background-color:white;line-height:80px;text-align:center;">购物车暂无数据</li>';
          $('.cart_content').html(_str2);
        }
      }
    });
  }
});

function Ajax(code, num) {
  $.ajax({
    type: 'get',
    url: '../php/cartlist.php',
    data: {
      'type': 'change',
      'code': code,
      'num': num
    },
    dataType: 'json',
    success: function success(data) {
      alert(data.msg);
    }
  });
}

function Ajax1(code) {
  $.ajax({
    type: 'get',
    url: '../php/cartlist.php',
    data: {
      'type': 'del',
      'code': code
    },
    dataType: 'json',
    success: function success(data) {// console.log(data)
    }
  });
} // 计算总金额


function totalMoney() {
  // 
  var count = 0;
  var factmoney = 0;
  var lessmoney = 0;
  var $tr = $(".goodslist li");
  $tr.each(function () {
    // 复选框是不是选中了
    if ($(this).find("input").prop("checked")) {
      count += parseInt($(this).find('.num em').html());
      factmoney += parseFloat($(this).find('h4').html());
      lessmoney += parseFloat($(this).find('b').html());
    }
  });
  $(".money h3").find("em").html("￥" + (factmoney + lessmoney) + '.00');
  $(".money h3").find("i").html("￥" + lessmoney + '.00');
  $(".money p").find('em').html(count);
  $(".money p").find('b').html("￥" + factmoney + '.00');
}