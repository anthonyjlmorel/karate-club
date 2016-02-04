
var XLSX = require("xlsx"),
	fs = require("fs");

var workbook = XLSX.readFile('./001 resultats open kata du 14 novembre 2015 a bouxwiller.xlsx'),
	first_sheet_name = workbook.SheetNames[0],
	worksheet = workbook.Sheets[first_sheet_name];

var errorCount = 0;

var resultMap = {
	nbr: 0,
	results:{}
};

for (z in worksheet) {
	/* all keys that do not begin with "!" correspond to cell addresses */
	if(z[0] === '!') continue;
	
	// Found Line with Leo Lagrange in it
	if(isLeoLagrange(z)){
		
		try{
			var fighter = extractFighterResult(z);
			
			if(!resultMap.results[fighter.category]){
				resultMap.results[fighter.category] = [];
			}
			
			resultMap.results[fighter.category].push(fighter);
			resultMap.nbr++;
			
		}catch(e){
			// The method usually fails
			// because there is no result for the guy (rank > 7)
			errorCount++;
		}
	}
}

fs.writeFileSync('./output.json', JSON.stringify(resultMap, null, 4));

// => { firstName, lastName, contest, category, result }
function extractFighterResult(z){
	var cell = XLSX.utils.decode_cell(z),
		fighter = {};
		
	// put at line begining
	cell.c = cell.c - 4;
	
	// Extract line information
	
	fighter.licenceNumber = worksheet[XLSX.utils.encode_cell({c: cell.c , r: cell.r})].v;
	fighter.result = worksheet[XLSX.utils.encode_cell({c: cell.c + 1 , r: cell.r})].v;
	fighter.firstName = worksheet[XLSX.utils.encode_cell({c: cell.c + 2 , r: cell.r})].v;
	fighter.lastName = worksheet[XLSX.utils.encode_cell({c: cell.c + 3 , r: cell.r})].v
	
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

function isLeoLagrange(cell){
	var regexp = /leo\s+lagrange/gi,
		value = worksheet[cell].v;
	
	return typeof value == "string" && value.match(regexp) != null;
}

// From 'ABE36' => {col: 'ABE', row: 36}
function getColAndRow(cr){
	var i = 0;
	
	while(i<cr.length && isNaN(parseInt(cr.charAt(i), 10))){
		i++;
	}
	
	if(i == 0){
		return {
			col: cr.charAt(0),
			row: parseInt(cr.substring(1), 10)
		};
	}
	return {
		col: cr.substring(0, i),
		row: parseInt(cr.substring(i), 10)
	};
}