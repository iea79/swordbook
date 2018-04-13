var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device

$(document).ready(function() {

    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	if ('flex' in document.documentElement.style) {
		// Хак для UCBrowser
		if (navigator.userAgent.search(/UCBrowser/) > -1) {
			document.documentElement.setAttribute('data-browser', 'not-flex');
		} else {		
		    // Flexbox-совместимый браузер.
			document.documentElement.setAttribute('data-browser', 'flexible');
		}
	} else {
	    // Браузер без поддержки Flexbox, в том числе IE 9/10.
		document.documentElement.setAttribute('data-browser', 'not-flex');
	}

	// First screen full height
	function setHeiHeight() {
	    $('.full__height').css({
	        minHeight: $(window).height() + 'px'
	    });
	}
	setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
	$(window).resize( setHeiHeight ); // обновляем при изменении размеров окна


	// Reset link whte attribute href="#"
	$('[href*="#"]').click(function(event) {
		event.preventDefault();
	});

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
	$('[data-scroll]').click( function(){ 
		var scroll_el = $(this).attr('href'); 
		if ($(scroll_el).length != 0) {
		$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
		}
		return false;
	});

	// Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
    // $(document).ready(function(){
    //     var HeaderTop = $('#header').offset().top;
        
    //     $(window).scroll(function(){
    //             if( $(window).scrollTop() > HeaderTop ) {
    //                     $('#header').addClass('stiky');
    //             } else {
    //                     $('#header').removeClass('stiky');
    //             }
    //     });
    // });
   	// setGridMatch($('[data-grid-match] .grid__item'));
   	gridMatch();

   	$('[type=tel]').inputmask("+7(999)99-99-999",{ showMaskOnHover: false });

	new Vue({
		el: '#slider',
		data: {
			perspective: 0,
			slides: 10
		},
		components: {
			'carousel-3d': Carousel3d.Carousel3d,
			'slide': Carousel3d.Slide
		}
	});

	$('.radio').on('change', function() {
		if ($(this).prop('checked')) {
			// var price = $(this).val();
			$('.buy__check_price span').html($(this).val())			
		}
	});

    $(".buy .button").on('click', function (e){ 
	    e.preventDefault();
    	var form = $(this).closest('.form');
    	var url = form.attr('action');
        var form_data = form.serialize();
        var field = form.find('[required]');

        empty = 0;

        field.each(function() {
	        if ($(this).val() == "") {
	        	$(this).addClass('invalid');
	        	// return false;
	        	empty++;
	        }  	
        });

        if (empty > 0) {
        	return false;
        } else {    	
	        $.ajax({
	            url: url,
	            type: "POST",
	            dataType: "html",
	            data: form_data,
	            success: function (response) {
	            	$('#success').modal('show');
	            }
	        });
        }

    });

    // $(".free .button").on('click', function (e){ 
	   //  e.preventDefault();
    // 	var form = $(this).closest('.form');
    // 	var url = form.attr('action');
    //     var form_data = form.serialize();
    //     var field = form.find('[required]');

    //     field.each(function() {
	   //      if ($(this).val() == "") {
	   //      	$(this).addClass('invalid');
	   //      	return false;
	   //      }  	
    //     });

    //     $.ajax({
    //         url: url,
    //         type: "POST",
    //         dataType: "html",
    //         data: form_data,
    //         success: function (response) {
    //         	$('.modal').modal('hide');
    //         	$('#free_success').modal('show');
    //         }
    //     });
    // });


});

$(window).resize(function(event) {
	checkOnResize()
});

function checkOnResize() {
   	// setGridMatch($('[data-grid-match] .grid__item'));
   	gridMatch();
}

function gridMatch() {
   	$('[data-grid-match] .grid__item').matchHeight({
   		byRow: true,
   	});
}

// function setGridMatch(columns) {
// 	var tallestcolumn = 0;
// 	columns.removeAttr('style');
// 	columns.each( function() {
// 		currentHeight = $(this).height();
// 		if(currentHeight > tallestcolumn) {
// 			tallestcolumn = currentHeight;
// 		}
// 	});
// 	setTimeout(function() {
// 		columns.css('minHeight', tallestcolumn);
// 	}, 100);
// }

