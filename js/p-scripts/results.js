var resultsReady = function(){
	
	var resultsMap,
		years = [],
		currentYear = new Date().getFullYear(),
		selectedYear = ko.observable(null),
		displayedResults = ko.observableArray([]);
	
	if(new Date().getMonth() < 8){
		currentYear--;
	}
	
	var selectYear = function(year){
		selectedYear(year);
		
		return loadYear();
	},
	displayResults = function(year){
		var year = selectedYear();
		if(year == null){ return ; }
		var resultsLst = resultsMap[year.toString()];
		if(!resultsLst){return;}
		
		var results = [];
		
		for(var i in resultsLst){
			var contest = {
				name: resultsLst[i].contestName,
				categories: []
			};
			
			for(var j in resultsLst[i].results){
				var cat = {
					name : j,
					fighters: resultsLst[i].results[j]
				};
				
				contest.categories.push(cat);
				
				cat.fighters.sort(function(a, b){
					return a.rank - b.rank;
				});
			}
			
			results.push(contest);
		}
		
		displayedResults(results);		
	},
	loadYear = function(){
		
		var year = selectedYear();
		if(year == null){ return ; }
		var resultsLst = resultsMap[year.toString()];
		if(!resultsLst){return;}
		
		var promises = [],
			requestFile = function(i){
				return $.ajax({
							url:'pages/results/' + resultsLst[i].file,
							dataType: 'json',
							cache: false
						}).then(function(fileData){
							resultsLst[i].results = fileData.results;
							resultsLst[i].contestName = fileData.contestName;
						});
			};
			
		for(var i in resultsLst){
			promises.push(requestFile(i));
		}
		
		return $.when.apply($, promises)
			.then(function(){
				displayResults(year);
			});
		
	};
	
	$.ajax({
		url:'pages/results-list.json',
		dataType: 'json',
		cache: false
	}).then(function(list){
		resultsMap = list["list"];
		
		for(var i in resultsMap){
			var year = parseInt(i, 10);
			if( !isNaN(year)){
				years.push(year);
				
				if(year == currentYear){
					selectedYear(year);
				}
			}
			
			for(var j in resultsMap[i]){
				resultsMap[i][j] = {
					results: null,
					file: resultsMap[i][j]
				};	
			}
			
		}
		
		years.sort().reverse();
		
		if(selectedYear() != null){
			selectYear(selectedYear())
			.then(function(){
				ko.applyBindings({
					years: years,
					currentYear: currentYear,
					selectedYear: selectedYear,
					displayedResults: displayedResults,
					selectYear: selectYear
				});
			});
		}
	});
	
};