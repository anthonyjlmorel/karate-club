<section class="results">
	<div class="years-selection">
		<ul data-bind="foreach: years">
			<li data-bind="text: $data + '-' + ($data+1), 
						click: function(){$parent.selectYear($data);},
						css:{'active' : $parent.selectedYear() == $data}"></li>
		</ul>	
	</div>
	<div class="selected-results">
		<h1 data-bind="text: 'Saison ' + selectedYear() + '-' + (selectedYear() + 1)"></h1>
		
		<!-- ko if: displayedResults && displayedResults().length > 0 -->
		<!-- ko foreach: displayedResults -->
		
		<h2 data-bind="text: name"></h2>
		<h2>En Individuel</h2>
		<div data-bind="foreach: individuals">
			<h4 data-bind="text: name"></h4>
			<div class="fighters" data-bind="foreach: fighters">
				<div>
					<div data-bind="text: firstName"></div>
					<div data-bind="text: lastName"></div>
					
					<!-- ko with: (function(){
						
						switch(rank){
							case 1:
								return "1 er/ère";
							default:
								return rank + " ieme";
						}
						
						})() -->
					<div data-bind="text: $data"></div>
					<!-- /ko -->
				</div>
				
			</div>
		</div>
		
		<!-- ko if: teams && teams.length > 0 -->
		<h2>Par Equipes</h2>
		<div data-bind="foreach: teams">
			<h4 data-bind="text: name"></h4>
			<div class="fighters" data-bind="foreach: fighters">
				<div>
					<div data-bind="foreach: fighters">
						<div data-bind="text: firstName + ' ' + lastName"></div>
					</div>
					
					
					<!-- ko with: (function(){
						
						switch(rank){
							case 1:
								return "1 er/ère";
							default:
								return rank + " ieme";
						}
						
						})() -->
					<div data-bind="text: $data"></div>
					<!-- /ko -->
				</div>
				
			</div>
		</div>
		<!-- /ko -->
		<hr/>
		
		<!-- /ko -->
		<!-- /ko -->
	</div>
</section>