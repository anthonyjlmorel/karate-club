
var XLSX = require("xlsx"),
	fs = require("fs");

var paramsMap = {},
	categories = [/poussin/gi, /pupille/gi, /benjamin/gi, /minime/gi, /cadet/gi, /junior/gi, /senior/gi, /sénior/gi, /espoir/gi, /veterant/gi, /vétéran/gi];

process.argv.forEach(function (val, index, array) {
	if (val.indexOf("--") > -1 && process.argv.length > index + 1) {
		paramsMap[val.substring(2)] = process.argv[index + 1].toLowerCase();
	}
});

if(paramsMap['file'] && paramsMap['out']){
	extractResult(paramsMap['file'], paramsMap['out']);	
}

function extractResult(fileName, outputfile){
	var workbook = XLSX.readFile(fileName),
		first_sheet_name = workbook.SheetNames[0],
		worksheet = workbook.Sheets[first_sheet_name],
		errors = [],
		resultMap = {
			contestName: null,
			nbr: 0,
			individualResults:{},
			teamResults: {}
		};
	
	for (z in worksheet) {
		/* all keys that do not begin with "!" correspond to cell addresses */
		if(z[0] === '!') continue;
		
		// Found Line with Leo Lagrange in it
		if(isLeoLagrange(z, worksheet)){
			
			try {
				var fighter,
					map,
					mapKey;
				
				if(isMerge(z, worksheet)){
					map = resultMap.teamResults;
					fighter = extractTeamResult(z, worksheet);
				}else{
					map = resultMap.individualResults;
					fighter = extractFighterResult(z, worksheet);
				}
				
				if(fighter){
					mapKey = fighter.category;
					if(!map[mapKey]){
						map[mapKey] = [];
					}
					
					map[mapKey].push(fighter);
					resultMap.nbr++;
					
					if(!resultMap.contestName && fighter.contest){
						resultMap.contestName = fighter.contest;
					}
				}
				
			} catch(e){
				errors.push(e.toString());
			}
		}
	}

	var spaces = null;
	if(paramsMap['b']){
		spaces = 4;
	}
	fs.writeFileSync(outputfile, JSON.stringify(resultMap, null, spaces));
	
	console.log("Errors: " + errors.length);
	
	fs.writeFileSync('./errors.json', JSON.stringify(errors));
}

function extractTeamResult(z, worksheet){
	var cell = XLSX.utils.decode_cell(z),
		fighter = {
			isTeam: true,
			rank: null,
			fighters: []
		},
		subFighter;
	
	// put at line begining
	cell.c = cell.c - 4;
	// Extract line information
	var rankCell = worksheet[XLSX.utils.encode_cell({c: cell.c + 1 , r: cell.r})];
	if(!rankCell){
		// Avoid those without ranking
		return null;
	}
	
	fighter.rank = rankCell.v;
	
	// For now, team are made up to three peoples
	for(var i=0;i<3;i++){
		subFighter = {
			lastName: null,
			firstName: null
		};
		
		subFighter.lastName = worksheet[XLSX.utils.encode_cell({c: cell.c + 2 , r: cell.r+i})].v;
		subFighter.firstName = worksheet[XLSX.utils.encode_cell({c: cell.c + 3 , r: cell.r+i})].v;
		
		fighter.fighters.push(subFighter);
	}
	
	// Find Table header to get category/contest
	var fighterMetaData = getCatAndContestFromRow(cell, worksheet, fighter);
	if(fighterMetaData){
		fighter.category = fighterMetaData.category;
		fighter.contest = fighterMetaData.contest;
	}
	
	return fighter;
}


// => { firstName, lastName, contest, category, result }
function extractFighterResult(z, worksheet){
	var cell = XLSX.utils.decode_cell(z),
		fighter = {};
		
	// put at line begining
	cell.c = cell.c - 4;
	
	// Extract line information
	// fighter.licenceNumber = worksheet[XLSX.utils.encode_cell({c: cell.c , r: cell.r})].v;
	var rankCell = worksheet[XLSX.utils.encode_cell({c: cell.c + 1 , r: cell.r})];

	if(!rankCell){
		// Avoid those without ranking
		return null;
	}
	
	fighter.rank = rankCell.v;
	fighter.lastName = worksheet[XLSX.utils.encode_cell({c: cell.c + 2 , r: cell.r})].v;
	fighter.firstName = worksheet[XLSX.utils.encode_cell({c: cell.c + 3 , r: cell.r})].v;
	
	
	// Find Table header to get category/contest
	var fighterMetaData = getCatAndContestFromRow(cell, worksheet, fighter);
	
	if(fighterMetaData){
		fighter.category = fighterMetaData.category;
		fighter.contest = fighterMetaData.contest;
	}
	
	
	for(var i in fighter){
		if(typeof fighter[i] == "string"){
			fighter[i] = fighter[i].trim();
		}		
	}
		
	return fighter;
}

function isLeoLagrange(cell, worksheet){
	var regexp = /leo\s+lagrange/gi,
		value = worksheet[cell].v;
	
	return typeof value == "string" && value.match(regexp) != null;
}

function isMerge(z, worksheet){
	
	var i = 0,
		range,
		cell = XLSX.utils.decode_cell(z);
		
	for(i=0;i<worksheet['!merges'].length;i++){
		range = worksheet['!merges'][i];
		
		if(areCellsEqual(cell, range.e) || areCellsEqual(cell, range.s)){
			return true;
		}
	}
	
	return false;
}

function areCellsEqual(cell1, cell2){
	return cell1.r == cell2.r && cell1.c == cell2.c;
}

function getCatAndContestFromRow(cell, worksheet, fighter){
	var r = cell.r,
		c = cell.c,
		s,
		matched,
		result = {},
		maxJumps = 8*3,
		jumps = fighter.rank;
	
	r -= fighter.rank;
	
	
	r++;
	jumps--;
	do{

		jumps++;
		r--;
		
		cont = worksheet[XLSX.utils.encode_cell({c: c , r: r})];
		if(cont){
			s = cont.v;	
		}else{
			continue;
		}
		
	} while(jumps <= maxJumps && !isResultArrayHeader(s));
	
	if(jumps <= maxJumps){
		result.category = s;	
	}else{
		result.category = "CATEGORIE NON CLASSEE";
	}
	
	
	var contestHeader = worksheet[XLSX.utils.encode_cell({c: c , r: r-5})];
	if(contestHeader){
		result.contest = contestHeader.v
		if(result.contest && result.contest.match(/resultats/gi) != null){
			result.contest = result.contest.replace(/resultats/gi, '').trim();
		}
	}
	
	
	return result;
}

function isResultArrayHeader(value){
	if(!value){
		return false;
	}
	var matched;
	for(var i=0;i<categories.length;i++){
		
		matched = value.match(categories[i]);
		
		if(matched){
			return true;
		}
		
	}
	
	return false;
}
