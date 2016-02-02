
var calendarReady = function(){
	
	var calendarData,
		viewModel = {
			selectedEvents: ko.observableArray([])
		};
	
	function myDateFunction(id) {
		var date = $("#" + id).data("date"),
			hasEvent = $("#" + id).data("hasEvent"),
			events = [];
		
		if(hasEvent){
			calendarData.forEach(function(evt){
				if(evt.date == date){
					events.push(evt);
				}
			});
			
			viewModel.selectedEvents(events);	
		}
	}
	
	function detectMultipleEvents(data){
		var map = {},
			result = [];
			
		data.forEach(function(evt){
			if(!map[evt.date]){
				map[evt.date] = [];
			}
			
			if(map[evt.date].length >= 1){
				delete map[evt.date][map[evt.date].length - 1].classname;
				delete evt.classname;
				evt.badge = true;
			}
			
			map[evt.date].push(evt);
			
			result.push(evt);
		});
			
		return result;
	}
	
	// {date: yyyy-mm-dd, badge: boolean, title: string, body: string: footer: string, classname: string}
	$.ajax({
		url:'pages/calendar-events.json',
		dataType: 'json',
		cache: false
	}).then(function(result){
		
		calendarData = result.data;
		
		$(".calendar-container").zabuto_calendar({
			language: "fr",
			show_previous: false,
			action: function() { myDateFunction(this.id); } ,
			legend: [
				{
					type: 'block', 
					label: 'Formation', 
					classname: 'formation'
				},
				{
					type: 'block', 
					label: 'Stage', 
					classname: 'stage'
				},
				{
					type: 'block', 
					label: 'Championnat', 
					classname: 'championnat'},
				{
					type: 'block', 
					label: 'Coupe', 
					classname: 'coupe'
				},
				{
					type: 'text',
					label: 'Multiple événements',
					badge: '5'
				}],
			data: detectMultipleEvents(result.data)
		});
		
		ko.applyBindings(viewModel);
	});
};