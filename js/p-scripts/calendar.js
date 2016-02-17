
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
	
	function sortEvents(data){
		data.sort(function(a,b){
			return new Date(a.date).getTime() - new Date(b).getTime();
		});
		return data;
	}
	
	// {date: yyyy-mm-dd, badge: boolean, title: string, body: string: footer: string, classname: string}
	$.ajax({
		url:'pages/calendar-events.json',
		dataType: 'json',
		cache: false
	}).then(function(result){
		
		calendarData = result.data;
		var events = sortEvents(detectMultipleEvents(result.data)),
			today = new Date(),
			current = 0,
			date = new Date(events[current].date);
		
		while(current < events.length && date.getTime() < today.getTime()){
			current++;
			date = new Date(events[current].date);
		}
		
		if(current >= events.lenth){
			date = today;
		}
		
		$(".calendar-container").zabuto_calendar({
			year: date.getFullYear(),
			month: date.getMonth()+1,
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
			data: events
		});
		
		ko.applyBindings(viewModel);
	});
};