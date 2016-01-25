


$(document).ready(function(){
	
	$.ajax({
		url:'pages/team-descriptor.json',
		dataType: 'json'
	}).then(function(result){
		
		ko.applyBindings(result);
	});
	
});