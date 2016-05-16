<section class="results">
	<div class="years-selection">
		<ul>
		<!-- ko foreach: years -->
			<li data-bind="text: $data + '-' + ($data+1), 
						click: function(){$parent.selectYear($data);},
						css:{'active' : $parent.selectedYear() == $data}"></li>
		<!-- /ko -->
			<li><a href="pages/results-archive/karresindex.htm" target="__blank">(Archives)</a></li>
		</ul>	
	</div>
	<div class="selected-results">
	
		<h1 data-bind="text: 'Saison ' + selectedYear() + '-' + (selectedYear() + 1)"></h1>
		
		<div class="sort-selectors">
			<div data-bind="css:{'active': displayMode() == 'by-contest'}">
				<h3 class="sort-selector" data-bind="click: function(){displayBy('by-contest');}">Par évènement</h3>
			</div>
			<div data-bind="css:{'active': displayMode() == 'by-fighter'}">
				<h3 class="sort-selector" data-bind="click: function(){displayBy('by-fighter');}">Par élève</h3>
			</div>
		</div>
		
		<!-- ko if: displayedResults().length == 0 -->
		<h3>Chargement</h3>
		<!-- /ko -->
		
		<!-- ko if: displayedResults && displayedResults().length > 0  && displayMode() == "by-contest"-->
		<!-- ko foreach: displayedResults -->
		
		<h2 data-bind="text: name"></h2>
		<!-- ko if: individuals && individuals.length > 0 -->
		<h2>En Individuel</h2>
		<div data-bind="foreach: individuals">
			<h4 data-bind="text: name"></h4>
			<div class="fighters" data-bind="foreach: fighters">
				<div>
					<div data-bind="text: firstName"></div>
					<div data-bind="text: lastName"></div>
					
					<div>
					<!-- ko text: rank -->
					<!-- /ko -->
					<!-- ko with: (function(){
						
						switch(rank){
							case 1:
								return "er";
							default:
								return "e";
						}
						
						})() -->
						<sup data-bind="text: $data"></sup>
					<!-- /ko -->	
					</div>
				</div>
				
			</div>
		</div>
		<!-- /ko -->
		
		<!-- ko if: teams && teams.length > 0 -->
		<h2>Par Equipes</h2>
		<div data-bind="foreach: teams">
			<h4 data-bind="text: name"></h4>
			<div class="fighters" data-bind="foreach: fighters">
				<div>
					<div data-bind="foreach: fighters">
						<div data-bind="text: firstName + ' ' + lastName"></div>

					</div>
					
					<div>
					<!-- ko text: rank -->
					<!-- /ko -->
					<!-- ko with: (function(){
						
						switch(rank){
							case 1:
								return "er";
							default:
								return "e";
						}
						
						})() -->
						<sup data-bind="text: $data"></sup>
					<!-- /ko -->	
					</div>
					
				</div>
				
			</div>
		</div>
		<!-- /ko -->
		<hr/>
		
		<!-- /ko -->
		<!-- /ko -->
		
		
		
		<!-- ko if: displayedResults && displayedResults().length > 0  && displayMode() == "by-fighter"-->
		<!-- ko foreach: displayedResults -->
		
		<h3 data-bind="text: lastName + ' '  + firstName"></h3>
		
		<div class="fighters" data-bind="foreach: contests">
		<div>
			<!-- ko ifnot: isTeam -->
			<div data-bind="text: name"></div>
			<!-- /ko -->
			<!-- ko if: isTeam -->
			<div data-bind="text: name + ' (Par équipe)'"></div>
			<!-- /ko -->
			
			<div data-bind="text: category"></div>
			<div>
			<span data-bind="text: rank"></span>
			<!-- ko with: (function(){
						
				switch(rank){
					case 1:
						return "er";
					default:
						return "e";
				}
				
				})() -->
				<sup data-bind="text: $data"></sup>
			<!-- /ko -->
			</div>
			
		</div>
		</div>
		<!-- /ko -->	
		
		<!-- /ko -->
		<!-- /ko -->
	</div>
</section>