
var mainMenuFunc = function(){
	var toggle = function(){
		
		$('.main-menu ul').slideToggle({
			complete: function(){
				if($('.main-menu ul').is(':visible')){
					$('.main-menu .toggle').removeClass('collapsed').addClass('expanded');
				} else{
					$('.main-menu .toggle').removeClass('expanded').addClass('collapsed');
				}
			}
		});
	};
	
	$('.main-menu .toggle').on('click',function(){
		toggle();
	});
	
	if($('.main-menu .toggle').is(':visible')){
		toggle();
	}
	
	$(window).resize(function(){
		
		setTimeout(function(){
			if(!$('.main-menu .toggle').is(':visible')){
				if(!$('.main-menu ul').is(':visible')){
					toggle();
				}
			}
		}, 200);
	});
};

$(document).ready(mainMenuFunc);