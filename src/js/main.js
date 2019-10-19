$(document).ready(function () {

  // console.log(1111111111);



    //获取节点/设置变量
    var $svg = $(".sidebar"),
      $demo = $(".demo"),
      $path = $(".s-path"),
      $sCont = $(".sidebar-content"),
      $chat = $(".chat"),
      demoTop = $demo.offset().top,
      demoLeft = $demo.offset().left,
      diffX = 0,
      curX = 0,
      finalX = 0,
      frame = 1000 / 60,
      animTime = 600,
      sContTrans = 200,
      animating = false;

    //获取屏幕高度
    var _hei = document.documentElement.clientHeight;

    //获取屏幕高度
    var _wid = document.documentElement.clientWidth;

    var easings = {
      smallElastic: function (t, b, c, d) {
        var ts = (t /= d) * t;
        var tc = ts * t;
        return b + c * (33 * tc * ts + -106 * ts * ts + 126 * tc + -67 * ts + 15 * t);
      },
      inCubic: function (t, b, c, d) {
        var tc = (t /= d) * t * t;
        return b + c * (tc);
      }
    };

  




  function createD(top, ax, dir) {
    return "M0,0 " + top + ",0 a" + ax + "," + Math.floor(_hei / 2) + " 0 1," + dir + " 0," + _hei + " L0," + _hei;
  }

  var startD = createD(50, 0, 1), //50 ->重置时矩形宽度   0 ->重置时圆弧状态    1->
    midD = createD(125, 75, 0),

    //拉出完成后(提出聊天目录)矩形重置到的宽度(错)
    finalD = createD(200, 0, 1),

    clickMidD = createD(300, 80, 0),
    clickMidDRev = createD(200, 100, 1),


    //点击聊天头像后 矩形完全展开
    clickD = createD(_wid, 0, 1),
    currentPath = startD;

  function newD(num1, num2) {
    var d = $path.attr("d"), //获取path的D属性
      num2 = num2 || Math.floor(_hei / 2),
      nd = d.replace(/\ba(\d+),(\d+)\b/gi, "a" + num1 + "," + num2);
    return nd;
  }

  function animatePathD(path, d, time, handlers, callback, easingTop, easingX) {
    var steps = Math.floor(time / frame),
      curStep = 0,
      oldArr = currentPath.split(" "),
      newArr = d.split(" "),
      oldTop = +oldArr[1].split(",")[0],
      topDiff = +newArr[1].split(",")[0] - oldTop,
      nextTop,
      nextX,
      easingTop = easings[easingTop] || easings.smallElastic,
      easingX = easings[easingX] || easingTop;

    //移除所有的"鼠标按下"和"鼠标松开"事件
    $(document).off("mousedown mouseup");

    function animate() {
      curStep++;
      nextTop = easingTop(curStep, oldTop, topDiff, steps);
      // console.log(curStep+" "+oldTop+ " "+topDiff+" "+steps);
      nextX = easingX(curStep, curX, finalX - curX, steps);
      oldArr[1] = nextTop + ",0";
      oldArr[2] = "a" + Math.abs(nextX) + "," + _hei;
      oldArr[4] = (nextX >= 0) ? "1,1" : "1,0";
      $path.attr("d", oldArr.join(" "));

      if (curStep > steps) {
        curX = 0;
        diffX = 0;
        $path.attr("d", d);
        currentPath = d;
        if (handlers) handlers1();
        if (callback) callback();
        return;
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  function handlers1() {
    console.log("start");


    //按下矩形
    $(document).on("mousedown touchstart", ".s-path", function (e) {
      var startX = e.pageX || e.originalEvent.touches[0].pageX;


      //矩形拖动时
      $(document).on("mousemove touchmove", function (e) {
        var x = e.pageX || e.originalEvent.touches[0].pageX;
        diffX = x - startX;
        if (diffX < 0) diffX = 0;
        if (diffX > 300) diffX = 300;
        curX = Math.floor(diffX / 2);
        $path.attr("d", newD(curX));
      });
    });

    //矩形松开拖动
    $(document).on("mouseup touchend", function () {
      $(document).off("mousemove touchmove");
      if (animating) return;
      if (!diffX) return;
      if (diffX < 40) {
        animatePathD($path, newD(0), animTime, true);
      } else {
        animatePathD($path, finalD, animTime, false, function () {
          $sCont.addClass("active");
          setTimeout(function () {
            $(document).on("click", closeSidebar);
          }, sContTrans);
        });
      }
    });

  }

  handlers1();


  //收起目录?
  function closeSidebar(e) {
    if ($(e.target).closest(".sidebar-content").length ||
      $(e.target).closest(".chat").length) return;
    if (animating) return;
    animating = true;
    $sCont.removeClass("active");
    $chat.removeClass("active");
    $(".cloned").addClass("removed");
    finalX = -75;
    setTimeout(function () {
      animatePathD($path, midD, animTime / 3, false, function () {
        $chat.hide();
        $(".cloned").remove();
        finalX = 0;
        curX = -75;
        animatePathD($path, startD, animTime / 3 * 2, true);
        animating = false;
      }, "inCubic");
    }, sContTrans);
    $(document).off("click", closeSidebar);
  }


  //头像移动函数
  function moveImage(that) {
    var $img = $(that).find(".contact__photo"),
      top = $img.offset().top - demoTop,
      left = $img.offset().left - demoLeft,
      $clone = $img.clone().addClass("cloned");

    $clone.css({
      top: top,
      left: left
    });
    $demo.append($clone);
    $clone.css("top");
    $clone.css({
      top: "3vh",
      left: "85vw"
    });
  }

  function ripple(elem, e) {
    var elTop = elem.offset().top,
      elLeft = elem.offset().left,
      x = e.pageX - elLeft,
      y = e.pageY - elTop;
    var $ripple = $("<div class='ripple'></div>");
    $ripple.css({
      top: y,
      left: x
    });
    elem.append($ripple);
  }


  //点击聊天列表
  $(document).on("click", ".contact", function (e) {
    if (animating) return;
    animating = true;
    $(document).off("click", closeSidebar);
    var that = this,
      name = $(this).find(".contact__name").text(),
      online = $(this).find(".contact__status").hasClass("online");
    $(".chat__name").text(name);
    $(".chat__online").removeClass("active");
    if (online) $(".chat__online").addClass("active");
    ripple($(that), e);
    setTimeout(function () {
      $sCont.removeClass("active");
      moveImage(that);
      finalX = -80;
      setTimeout(function () {
        $(".ripple").remove();
        animatePathD($path, clickMidD, animTime / 3, false, function () {
          curX = -80;
          finalX = 0;
          animatePathD($path, clickD, animTime * 2 / 3, true, function () {
            $chat.show();
            $chat.css("top");
            $chat.addClass("active");
            animating = false;
          });
        }, "inCubic");
      }, sContTrans);
    }, sContTrans);
  });


  //在聊天窗口中按"返回" 箭头
  $(document).on("click", ".chat__back", function () {
    if (animating) return;
    animating = true;
    $chat.removeClass("active");
    $(".cloned").addClass("removed");
    setTimeout(function () {
      $(".cloned").remove();
      $chat.hide();
      finalX = 100;
      animatePathD($path, clickMidDRev, animTime / 3, false, function () {
        curX = 100;
        finalX = 0;
        animatePathD($path, finalD, animTime * 2 / 3, true, function () {
          $sCont.addClass("active");
          $(document).on("click", closeSidebar);
          animating = false;
        });
      }, "inCubic");
    }, sContTrans);
  });

  $(window).on("resize", function () {
    demoTop = $demo.offset().top;
    demoLeft = $demo.offset().left;
  });

});


