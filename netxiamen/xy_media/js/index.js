var jQueryLe = jQuery.noConflict();

jQueryLe(function () {
			//nav
    // var navLi=jQueryLe(".menu .nav li");
    // navLi.mouseover(function () {
    //     jQueryLe(this).find("a").addClass("current");
    //     jQueryLe(this).find(".box").stop().slideDown(200);
    // })
    // navLi.mouseleave(function(){
    //     jQueryLe(this).find("a").removeClass("current");
    //     jQueryLe(this).find(".box").stop().slideUp(200);
    // })
	
	jQuery.navlevel = function(level1,dytime) {
    jQueryLe(level1).mouseenter(function(){
      varthis = jQueryLe(this);
      delytime=setTimeout(function(){
      varthis.find('div.box').slideDown();
    },dytime);
    });
    jQueryLe(level1).mouseleave(function(){
     clearTimeout(delytime);
     jQueryLe(this).find('div.box').slideUp();
    });
  };
  jQueryLe.navlevel(".menu li",200);
	
	// picFuns("#hotpics");
	 picFuns2("#hotpics2");
    Tabs(".cut li",".line2_lt blockquote .news","active","mouseover");
    Tabs(".t_cut li",".s_bg blockquote .t_con","active","click");
	

	//师资队伍正文展开
       //个人履历

       jQueryLe(".zw_cut").each(function (){
            if(jQueryLe(this).height() > 200){
                jQueryLe(this).addClass("h200")
                jQueryLe(this).parent(".zw_con").children(".down_i").show()
            }
            else{
                jQueryLe(this).removeClass("h200")
                jQueryLe(this).parent(".zw_con").children(".down_i").hide()
            }
       });

 
       jQueryLe(".down_i").on("click",function(){
         if(jQueryLe(this).parent(".zw_con").children(".zw_cut").hasClass("h200")){
             jQueryLe(this).parent(".zw_con").children(".zw_cut").removeClass("h200");
             jQueryLe(this).children(".down").addClass("up")
          }else{
             jQueryLe(this).parent(".zw_con").children(".zw_cut").addClass("h200");
             jQueryLe(this).children(".down").removeClass("up")
          }
        })



    
       
	
   var b_width = jQueryLe(window).width();
	jQueryLe(".hotnews .hotpics li").width(b_width)
	
})



//滑动门
function Tabs(tabs,container,active,event){
    jQueryLe(tabs).bind(event,function(){
        var oIndex = jQueryLe(tabs).index(this);
        jQueryLe(this).addClass(active).siblings().removeClass(active);
        jQueryLe(container).eq(oIndex).addClass(active).siblings().removeClass(active);
    })
};

//水平滚动
function picFuns(obj) {
    //var sWidth = jQueryLe(obj + " ul li").width(); //获取焦点图的宽度（显示面积）
    var sWidth = jQueryLe(window).width();
    var len = jQueryLe(obj + "  ul li").length; //获取焦点图个数
    var index = 0;
    var adTimer;
    var timea = 2000; //  time ctrl
    jQueryLe(obj + " ul").css("width", sWidth * (len));
    //intialize function
    function init() {
        jQueryLe(obj).hover(
            function() {clearInterval(adTimer);},

            function() {timer();});
        timer();
    }
    function showImg(index) {
        var newLeft = -index * sWidth;
        jQueryLe(obj + " ul").stop().animate({
            "left": newLeft
        }, 300);
    }
    function showTab(index) {
        jQueryLe(obj + " div span").eq(index).addClass("show").siblings().removeClass("show");
    }
    function timer() {
        adTimer = setInterval(function() {
            index++;
            if (index == len) {
                index = 0;
            }
            showImg(index);
            showTab(index);
        }, timea);
    }
    jQueryLe(obj + " .prev").click(function() {
        index -= 1;
        if (index == -1) {
            index = len-1;
        }
        showImg(index);
        showTab(index);
    });
    jQueryLe(obj + " .next").click(function() {
        index += 1;
        if (index == len) {
            index = 0;
        }
        showImg(index);
        showTab(index);
    });

    jQueryLe(obj + " div span").click(function() {
        index = jQueryLe(this).index();
        showImg(index);
        showTab(index);
    });
		jQueryLe(obj + " .prev").hover(function(){
		 jQueryLe(this).css("opacity",1);
		 jQueryLe(this).css("filter","alpha(opacity=100)")
		 },function(){
		jQueryLe(this).css("opacity",0.6);
		 jQueryLe(this).css("filter","alpha(opacity=60)") 
			 });
		jQueryLe(obj + " .next").hover(function(){
		 jQueryLe(this).css("opacity",1);
		 jQueryLe(this).css("filter","alpha(opacity=100)")
		 },function(){
		jQueryLe(this).css("opacity",0.6);
		 jQueryLe(this).css("filter","alpha(opacity=60)") 
			 });
    init();
};



//水平滚动
function picFuns2(obj) {
    var sWidth = jQueryLe(obj + " ul li").width(); //获取焦点图的宽度（显示面积）
    var len = jQueryLe(obj + "  ul li").length; //获取焦点图个数
    var index = 0;
    var adTimer;
    var timea =5000; //  time ctrl
    jQueryLe(obj + " ul").css("width", sWidth * (len));
    //intialize function
    function init() {
        jQueryLe(obj).hover(
            function() {clearInterval(adTimer);},

            function() {timer();});
        timer();
    }
    function showImg(index) {
        var newLeft = -index * sWidth;
        jQueryLe(obj + " ul").stop().animate({
            "left": newLeft
        }, 300);
    }
    function showTab(index) {
        jQueryLe(obj + " div span").eq(index).addClass("show").siblings().removeClass("show");
    }
    function timer() {
        adTimer = setInterval(function() {
            index++;
            if (index == len) {
                index = 0;
            }
            showImg(index);
            showTab(index);
        }, timea);
    }
    jQueryLe(obj + " .prev").click(function() {
        index -= 1;
        if (index == -1) {
            index = len-1;
        }
        showImg(index);
        showTab(index);
    });
    jQueryLe(obj + " .next").click(function() {
        index += 1;
        if (index == len) {
            index = 0;
        }
        showImg(index);
        showTab(index);
    });

    jQueryLe(obj + " div span").click(function() {
        index = jQueryLe(this).index();
        showImg(index);
        showTab(index);
    });
		jQueryLe(obj + " .prev").hover(function(){
		 jQueryLe(this).css("opacity",1);
		 jQueryLe(this).css("filter","alpha(opacity=100)")
		 },function(){
		jQueryLe(this).css("opacity",0.6);
		 jQueryLe(this).css("filter","alpha(opacity=60)") 
			 });
		jQueryLe(obj + " .next").hover(function(){
		 jQueryLe(this).css("opacity",1);
		 jQueryLe(this).css("filter","alpha(opacity=100)")
		 },function(){
		jQueryLe(this).css("opacity",0.6);
		 jQueryLe(this).css("filter","alpha(opacity=60)") 
			 });
    init();
};