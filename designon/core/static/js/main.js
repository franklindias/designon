( function($) {
  'use strict';



	/*-------------------------------------------------------------------------------
	  Window load
	-------------------------------------------------------------------------------*/



	$(window).load(function(){
        $('body').addClass('loaded');	
		$('.loader').fadeOut(200);
	});


	/*-------------------------------------------------------------------------------
	  Parallax
	-------------------------------------------------------------------------------*/



	$(window).stellar({
      responsive: true,
      horizontalScrolling: false,
      hideDistantElements: false,
      horizontalOffset: 0,
      verticalOffset: 0,
    });



	/*-------------------------------------------------------------------------------
	 Navbar collapse
	-------------------------------------------------------------------------------*/



	var navbar=$('.navbar');
	var navbarAffixHeight=56


	$('.navbar-collapse').on('show.bs.collapse', function () {
	 	navbar.addClass('affix');
	});

	$('.navbar-collapse').on('hidden.bs.collapse', function () {
		if (navbar.hasClass('affix-top')){
			navbar.removeClass('affix');
		}
			
	});

	$(".navbar-nav > li > a").on('click', function() {
	    $(".navbar-collapse").collapse('hide');
	});



	/*-------------------------------------------------------------------------------
	 Affix
	-------------------------------------------------------------------------------*/



	navbar.affix({
	  offset: {
	  	top:1
	  }
	});

	navbar.on('affixed-top.bs.affix', function() {
		if ($('.navbar-collapse').hasClass('in')){
			navbar.addClass('affix');
		}	
	});

	


	/*-------------------------------------------------------------------------------
	  Smooth scroll to anchor
	-------------------------------------------------------------------------------*/




    $('.js-scroller').on('click', function(e) {
    	e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html,body').animate({
                scrollTop: (target.offset().top - navbarAffixHeight + 1)
            }, 1000);
        }
    });




	/*-------------------------------------------------------------------------------
	 Scrollspy
	-------------------------------------------------------------------------------*/



	$('body').scrollspy({
		offset:  navbarAffixHeight + 1
	});
	


	/* ---------------------------------------------- /*
	 * Showcase
	/* ---------------------------------------------- */



	$('.js-isotope').imagesLoaded(function() {
		$('.js-isotope').isotope({
			layoutMode: 'masonry',
			itemSelector: '.js-isotope-item',
		});
	});



	/* ---------------------------------------------- /*
	   Showcase Filter
	/* ---------------------------------------------- */



	$('.filter a').on('click', function(e) {
        e.preventDefault();
		$('.filter .active').removeClass('active');
		$(this).addClass('active');
		var selector = $(this).attr('data-filter');
		$('.js-isotope').isotope({
			filter: selector,
			animationOptions: {
				duration: 500,
				queue: false
			}
		});
	});



	/* ---------------------------------------------- /*
	   Magnific Popup
	/* ---------------------------------------------- */



	$('.js-isotope').magnificPopup({
		  delegate: 'a',
		  mainClass: 'mfp-with-zoom',
	      type: 'image',
	      removalDelay: 0,
	      tLoading: 'Loading image #%curr%...',
	      fixedContentPos: true,
	      gallery: {
	        enabled: true,
	        navigateByImgClick: true
	      },
	      image: {
	        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
	        titleSrc: function(item) {
	          return item.el.attr('title') + '<small></small>';
	        }
	      }
	});

	$('.js-play').magnificPopup({
        type: 'iframe'
    });



	/*-------------------------------------------------------------------------------
	  Carousel
	-------------------------------------------------------------------------------*/



 	$(".review-carousel").owlCarousel({
     
       itemsCustom : [
         [0, 1]
       ],
       responsiveRefreshRate:0,
       autoHeight : true,
       navigation : false

  	});
    
      $("#owl-demo").owlCarousel({
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
  });



  	/*-------------------------------------------------------------------------------
	  Google map
	-------------------------------------------------------------------------------*/




  	/*-------------------------------------------------------------------------------
	  Ajax Form
	-------------------------------------------------------------------------------*/



	if ($('.js-ajax-form').length) {
		$('.js-ajax-form').each(function(){
			$(this).validate({
			    submitHandler: function(form){
		        	$.ajax({
			            type: "POST",
			            url:"mail.php",
			            data: $(form).serialize(),
			            success: function() {
			                $('.modal').modal('hide');
		                	$('#success').modal('show');
		                },

		                error: function(){
			            	$('.modal').modal('hide');
			                $('#error').modal('show');
			            }
			        });
			    }
			});
		});
	}

})(jQuery);