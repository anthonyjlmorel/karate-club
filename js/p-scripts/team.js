
var teamReady = function(){
	
	$.ajax({
		url:'cfg/team-descriptor.json',
		dataType: 'json',
		cache: false
	}).then(function(result){
		
		ko.applyBindings(result, $(".team")[0]);
	});
	
};