
$(document).ready(function(){
	
	var calendarData,
		viewModel = {
			selectedEvent: ko.observable(null)
		};
	
	function myDateFunction(id) {
		var date = $("#" + id).data("date"),
			hasEvent = $("#" + id).data("hasEvent"),
			event;
		
		if(hasEvent){
			calendarData.forEach(function(evt){
				if(evt.date == date){
					viewModel.selectedEvent(evt);
				}
			});	
		}
	}
	
	// {date: yyyy-mm-dd, badge: boolean, title: string, body: string: footer: string, classname: string}
	$.ajax({
		url:'pages/calendar-events.json',
		dataType: 'json'
	}).then(function(result){
		
		calendarData = result.data;
		
		$(".calendar-container").zabuto_calendar({
			language: "fr",
			show_previous: false,
			action: function() { myDateFunction(this.id); } ,
			legend: [{type: 'block', 
				label: 'Formation', 
				classname: 'formation'},
				{type: 'block', 
				label: 'Stage', 
				classname: 'stage'},
				{type: 'block', 
				label: 'Championnat', 
				classname: 'championnat'},
				{type: 'block', 
				label: 'Coupe', 
				classname: 'coupe'}],
			data: result.data
		});
		
		ko.applyBindings(viewModel);
	});
});