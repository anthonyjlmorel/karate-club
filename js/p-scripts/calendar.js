
$(document).ready(function(){
	
	function myDateFunction(id) {
		var date = $("#" + id).data("date");
		var hasEvent = $("#" + id).data("hasEvent");
		
		console.log(date + ',' + hasEvent);
		console.log($("#" + id).data('body'));
	}
	
	// {date: yyyy-mm-dd, badge: boolean, title: string, body: string: footer: string, classname: string}
	$.ajax({
		url:'pages/calendar-events.json',
		dataType: 'json'
	}).then(function(result){
		
		$(".calendar-container").zabuto_calendar({
			language: "fr",
			show_previous: false,
			action: function() { myDateFunction(this.id); } ,
			data: result.data
		});
		
	});
});