
var clubReady = function(){
	
	var images = ko.observableArray([]);
	
	$.ajax({
		url:'cfg/carousel.json',
		dataType: 'json',
		cache: false
	}).then(function(result){
		
		images(result['images']);
	});
	
	ko.applyBindings({images: images});
	
}; 