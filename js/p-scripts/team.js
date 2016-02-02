
var teamReady = function(){
	
	$.ajax({
		url:'pages/team-descriptor.json',
		dataType: 'json',
		cache: false
	}).then(function(result){
		
		ko.applyBindings(result);
	});
	
};