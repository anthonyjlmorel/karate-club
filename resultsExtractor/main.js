
var XLSX = require("xlsx"),
	fs = require("fs");

var paramsMap = {};
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
		errorCount = 0,
		resultMap = {
			contestName: null,
			nbr: 0,
			results:{}
		};
	
	for (z in worksheet) {
		/* all keys that do not begin with "!" correspond to cell addresses */
		if(z[0] === '!') continue;
		
		// Found Line with Leo Lagrange in it
		if(isLeoLagrange(z, worksheet)){
			
			try{
				var fighter = extractFighterResult(z, worksheet);
				
				if(!resultMap.results[fighter.category]){
					resultMap.results[fighter.category] = [];
				}
				
				resultMap.results[fighter.category].push(fighter);
				resultMap.nbr++;
				
				if(!resultMap.contestName){
					resultMap.contestName = fighter.contest;
				}
				
			}catch(e){
				// The method usually fails
				// because there is no result for the guy (rank > 7)
				errorCount++;
			}
		}
	}

	var spaces = null;
	if(paramsMap['b']){
		spaces = 4;
	}
	fs.writeFileSync(outputfile, JSON.stringify(resultMap, null, spaces));
}



// => { firstName, lastName, contest, category, result }
function extractFighterResult(z, worksheet){
	var cell = XLSX.utils.decode_cell(z),
		fighter = {};
		
	// put at line begining
	cell.c = cell.c - 4;
	
	// Extract line information
	
	fighter.licenceNumber = worksheet[XLSX.utils.encode_cell({c: cell.c , r: cell.r})].v;
	fighter.rank = worksheet[XLSX.utils.encode_cell({c: cell.c + 1 , r: cell.r})].v;
	fighter.lastName = worksheet[XLSX.utils.encode_cell({c: cell.c + 2 , r: cell.r})].v;
	fighter.firstName = worksheet[XLSX.utils.encode_cell({c: cell.c + 3 , r: cell.r})].v
	
	// Find Table header to get category
	var c = cell.c,
		r = cell.r,
		s = worksheet[XLSX.utils.encode_cell({c: c , r: r})].v,
		matched;
	
	while((matched = s.match(/licence/gi)) == null){
		s = worksheet[XLSX.utils.encode_cell({c: c , r: --r})].v;
	}
	
	if(matched != null){
		s = worksheet[XLSX.utils.encode_cell({c: c , r: --r})].v;
		fighter.category = s;
		fighter.contest = worksheet[XLSX.utils.encode_cell({c: c , r: r-5})].v;
		
		if(fighter.contest && fighter.contest.match(/resultats/gi) != null){
			fighter.contest = fighter.contest.replace(/resultats/gi, '').trim();
		}
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