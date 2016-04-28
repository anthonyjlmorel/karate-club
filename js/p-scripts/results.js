var resultsReady = function(){
	
	var resultsMap,
		years = [],
		displayMode = ko.observable("by-contest"),
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
	displayResultsByContest = function(year){
		var year = selectedYear();
		if(year == null){ return ; }
		var resultsLst = resultsMap[year.toString()];
		if(!resultsLst){return;}
		
		var results = [];
		
		for(var i in resultsLst){
			var contest = {
				name: resultsLst[i].contestName,
				individuals: [],
				teams: []
			};
			
			
			
			for(var j in resultsLst[i].results.individualResults){
				var cat = {
					name : j,
					fighters: resultsLst[i].results.individualResults[j]
				};
				
				contest.individuals.push(cat);
				
				cat.fighters.sort(function(a, b){
					return a.rank - b.rank;
				});
			}
			
			for(var j in resultsLst[i].results.teamResults){
				var cat = {
					name : j,
					fighters: resultsLst[i].results.teamResults[j]
				};
				
				contest.teams.push(cat);
				
				cat.fighters.sort(function(a, b){
					return a.rank - b.rank;
				});
			}
			
			results.push(contest);
		}
		
		displayedResults(results);		
		
	},
	displayResultsByContendant = function(year){
		var year = selectedYear();
		if(year == null){ return ; }
		var resultsLst = resultsMap[year.toString()];
		if(!resultsLst){return;}
		
		var results = [],
			fighterMap = {};
		
		
		for(var i in resultsLst){
						
			for(var j in resultsLst[i].results.individualResults){
				
				resultsLst[i].results.individualResults[j].forEach(function(fighter){
					var key = fighter.lastName + "_" + fighter.firstName;
					if(!fighterMap[key]){
						fighterMap[key] = {
							firstName: fighter.firstName,
							lastName: fighter.lastName,
							contests:[]		
						};
						
						results.push(fighterMap[key]);
					}
					
					fighterMap[key].contests.push({
						name: resultsLst[i].contestName,
						rank: fighter.rank,
						category: j,
						isTeam: false
					});
				});
			}
			
			for(var j in resultsLst[i].results.teamResults){
				
				resultsLst[i].results.teamResults[j].forEach(function(re){
					
					re.fighters.forEach(function(f){
						var key = f.lastName + "_" + f.firstName;
						if(!fighterMap[key]){
							fighterMap[key] = {
								firstName: f.firstName,
								lastName: f.lastName,
								contests:[]		
							};
							
							results.push(fighterMap[key]);
						}
						
						fighterMap[key].contests.push({
							name: resultsLst[i].results.contestName,
							rank: re.rank,
							isTeam: true,
							category: j
						});
					});
				});
			}
		}
		
		results.sort(function(a,b){
			return a.lastName.localeCompare(b.lastName);
		});
		
		displayedResults(results);
	},
	displayResults = function(year){
		if(displayMode() == "by-contest"){
			displayResultsByContest(year);
		}else{
			displayResultsByContendant(year);
		}
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
							resultsLst[i].results = fileData;
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
					selectYear: selectYear,
					displayMode: displayMode,
					displayBy: function(mode){
						displayedResults([]); 
						displayMode(mode);
						selectYear(selectedYear());
					}
				});
			});
		}
	});
	
};