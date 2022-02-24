$(document).ready(function(){
    $(".f-search").mouseover(function(){
        $(".f-search").css("background","#fff");
        $(".f-search input[type='text']").css("width","150px");
        $(".f-search i").css("color","#333");
    });
    $(".f-search").mouseout(function(){
        $(".f-search").css("background","none");
        $(".f-search input[type='text']").css("width","0px");
        $(".f-search i").css("color","#B3B3B3");
    });
    
    var ztH = 0.7*$(".ztzl .col-md-3").width();
    $(".zt-item-img").css("height",ztH);
    $(".nqhj").css("height",ztH);
    $(".cxbt").css("height",ztH);
    $(".kcsz").css("height",ztH);
    $(".zl").css("height",ztH);
    
    var h3 =0.68*$(".pic-img").width();
    $(".pic-img img").css("height",h3);
    $(".pic-con").css("height",h3);
    $(".pic-img").css("height",h3);

    // $(".ztzl .col-md-3").css("height",ztH);
    $(".ztzl .ztzl-item img").css("height",ztH);
    $(".ztzl-bg").css("height",ztH);
    $(".ztzl-con").css("height",ztH);
    $(".ztzl-title img").css({"max-height":0.8*ztH,"padding-top":0.1*ztH});

    var fH = $(".focus-img img").width();
    $(".focus-img img").css("height",0.6*fH);
    var tH = $(".tsfx-img img").width();
    $(".tsfx-img img").css("height",0.6*tH);
    
    if($(document).width()>992){
        var w1 =$(".tabs-bg").width();
        $(".tabs-bg").css("height",0.118*w1);
        $(".tabs-bg2").css("height",0.118*w1);
        $(".tabs").css("padding-top",0.03*w1);  
    }
    else{
        $(".tabs-bg").css("height","112px");
        $(".tabs-bg2").css("height","112px");
        $(".tabs").css("padding-top","0px");
    }
	
	var imgW = $(".xyfg-pic").width();
	$(".xyfg-pic").css("height",0.60*imgW);
	$(".xyfg-title a").css("width",imgW);
	
    $(window).resize(function(){
        // var ztH = 0.7*$(".ztzl .col-md-3").width();
        // $(".ztzl .col-md-3").css("height",ztH);
        $(".nqhj").css("height",ztH);
        $(".cxbt").css("height",ztH);
        $(".kcsz").css("height",ztH);
        $(".zl").css("height",ztH);
        
        var h3 =0.68*$(".pic-img").width();
        $(".pic-img img").css("height",h3);
        $(".pic-con").css("height",h3);
        $(".pic-img").css("height",h3);

        var fH = $(".focus-img img").width();
        $(".focus-img img").css("height",0.6*fH);
        var tH = $(".tsfx-img img").width();
        $(".tsfx-img img").css("height",0.6*tH);
        
        if($(document).width()>992){
            var w1 =$(".tabs-bg").width();
            $(".tabs-bg").css("height",0.118*w1);
            $(".tabs-bg2").css("height",0.118*w1);
            $(".tabs").css("padding-top",0.03*w1);  
        }
        else{
            $(".tabs-bg").css("height","112px");
            $(".tabs-bg2").css("height","112px");
            $(".tabs").css("padding-top","0px");
        }
    });
    $(".focus-title").each(function (i) {    
        var divH1 = $(this).height();    
        var $a = $("a", $(this)).eq(0);    
        while ($a.outerHeight() > divH1) {    
            $a.text($a.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));    
        }  
    });
    $(".tsfx-item-title").each(function (i) {    
        var divH2 = $(this).height();    
        var $b = $("a", $(this)).eq(0);    
        while ($b.outerHeight() > divH2) {    
            $b.text($b.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));    
        }  
    });
    $(".whrl-item-title").each(function (i) {    
        var divH3 = $(this).height();    
        var $c = $("a", $(this)).eq(0);    
        while ($c.outerHeight() > divH3) {    
            $c.text($c.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));    
        }  
    });
    $(".book-detail").each(function (i) {    
        var divH4 = $(this).height();    
        var $d = $("div", $(this)).eq(0);    
        while ($d.outerHeight() > divH4) {    
            $d.text($d.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));    
        }  
    });
    $(".data-info2").each(function (i) {    
        var divH5 = $(this).height();    
        var $e = $("div", $(this)).eq(0);    
        while ($e.outerHeight() > divH5) {    
            $e.text($e.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));    
        }  
    });
    
    $(".myfancy").click(function(){
        var _id = $(this).attr('href');
        $(_id).show();
        $(_id).find(".pop-bg").show();
    });
    $('.m-pop .close').click(function(){
        $(".m-pop").hide();
    });
});