
var clubReady = function(){
	
	var images = ko.observableArray([]);
	
	$.ajax({
		url:'cfg/carousel.json',
		dataType: 'json',
		cache: false
	}).then(function(result){
		
		images(result['images']);
		
		//$("#mainCarousel").carousel();
	}, function(e){
		console.log(e);
	});
	
	ko.applyBindings({images: images}, $(".club")[0]);
	
}; 