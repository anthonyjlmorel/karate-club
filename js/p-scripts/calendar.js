
var calendarReady = function(){
	
	var calendarData,
		viewModel = {
			season: ko.observable(null),
			selectedEvents: ko.observableArray([]),
			calendarData: ko.observableArray([]),
			monthNames: ['Janvier', 'Février', 'Mars', 
						'Avril', 'Mai', 'Juin', 
						'Juillet', 'Aout', 'Septembre', 
						'Octobre', 'Novembre', 'Décembre']
		};
	
	function sortEvents(data){
		data.sort(function(a,b){
			return a.month - b.month;
		});
		
		data.forEach(function(a){
			a.events.sort(function(a,b){
				return a.date - b.date;
			});
		});
		
		return data;
	}
	
	function normalizeLinks(data){
		
		data.forEach(function(a){
			a.events.forEach(function(evt){
				var a = {
					"leaflet": null,
					"photos": null,
					"register": null
				};
				
				if(!evt.links){
					evt.links = {		
					};
				}
				
				$.extend(a, evt.links);
				evt.links = a;
			});
		});
	}
	
	// {date: yyyy-mm-dd, badge: boolean, title: string, body: string: footer: string, classname: string}
	$.ajax({
		url:'cfg/calendar-events.json',
		dataType: 'json',
		cache: false
	}).then(function(result){
		
		calendarData = result.data;
		viewModel.season(result.year);
		
		var events = sortEvents(result.data);
		
		normalizeLinks(events);
		
		viewModel.calendarData(events);
		
		ko.applyBindings(viewModel);
	});
};