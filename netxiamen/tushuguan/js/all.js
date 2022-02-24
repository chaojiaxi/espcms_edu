+ function() {
	// 导航栏
	if ($(window).width() > 768) {
		$('header .nav ul > li').hover(
			function() {
				$(this).find('ol').slideDown(200);
			},
			function() {
				$(this).find('ol').slideUp(200);
			});
	};

	// 新书推荐
	if ($(window).width() > 768) {
		var newBook = new Swiper('.newBook', {
			slidesPerView: 4,
			spaceBetween: 10,
			pagination: '.newBook-pagination',
			paginationClickable: true,
			autoplay: 5000
		});
	} else {
		var newBook = new Swiper('.newBook', {
			slidesPerView: 2,
			spaceBetween: 10,
			pagination: '.newBook-pagination',
			paginationClickable: true,
			autoplay: 5000
		});
	}

	if ($(window).width() > 768) {
		$('.newBook .book').hover(function() {
			$(this).find('.cont').addClass('hover');
		}, function() {
			$(this).find('.cont').removeClass('hover');
		});
	} else {
		$('.newBook .book').find('.cont').addClass('hover');
	}

	// bann
	var bann = new Swiper('.bann', {
		pagination: '.bann-pagination',
		paginationClickable: true,
		autoplay: 3000
	});

	//
	var w = $('.notice strong').eq(0).width();

	$('.notice em').css({
		"width": w + 'px'
	});
	$('.notice .cont').eq(0).css({
		"display": 'block'
	});

	$('.notice strong').mouseover(function() {
		var tw = $(this).width();
		var position = $(this).position();
		var dataName = $(this).attr("data-name");
		$('.notice em').animate({
			"left": position.left + 'px',
			"width": tw + "px"
		});
		$('.notice .cont').each(function() {
			if ($(this).attr("data-show") === dataName) {
				$(this).fadeIn().siblings().hide();
			};
		})
	});

	//
	$('.notice strong').mouseover(function() {
		if ($(this).is('[data-name="tongzhi"]')) {
			$('.more').attr("href", "http://lib.baiyunu.edu.cn/html/cn/xinwendongtai/");
		} else if ($(this).is('[data-name="dongtai"]')) {
			$('.more').attr("href", "http://lib.baiyunu.edu.cn/html/cn/dianziziyuan/");
		};
	});

	//
	$('.navAnniu').on('click', function() {
		$('header .nav').addClass('hover');
		$('.model').fadeIn(100);
	});
	$('.model').on('click', function() {
		$('header .nav').removeClass('hover');
		$('.model').fadeOut(100);
	});

	//
	$('footer .layout li').hover(function(){
		$(this).find('span').fadeIn(100)
	},function(){
		$(this).find('span').fadeOut(50)
	});

	//
	if ($(window).width() > 768) {
		$('main .kuang a').hover(function(){
			$(this).find('dd').fadeIn(100)
		},function(){
			$(this).find('dd').fadeOut(100)
		})
	}else{
		$('main .kuang a').find('dd').css({"display":"block"})
	}
}()