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
		<div data-bind="foreach: categories">
			<h3 data-bind="text: name"></h3>
			<div class="fighters" data-bind="foreach: fighters">
				<div>
					<span data-bind="text: firstName"></span>
					<span data-bind="text: lastName"></span>
					
					<!-- ko with: (function(){
						
						switch(rank){
							case 1:
								return "1 er";
							default:
								return rank + " ieme";
						}
						
						})() -->
					<span data-bind="text: $data"></span>
					<!-- /ko -->
				</div>
				
			</div>
		</div>
		<hr/>
		
		<!-- /ko -->
		<!-- /ko -->
	</div>
</section>