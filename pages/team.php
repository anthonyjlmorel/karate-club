<section class="container team">
	<div class="row">
		<div class="col-lg-12 text-center">
			<h2 class="section-heading">L'Equipe</h2>
		</div>
	</div>
	
	<!-- ko with: (function(team){
		
		var rows = [];
		for(var i=0;i<team.length-1;i+=2){
			rows.push([
				team[i],
				team[i+1]
			]);
		}
		if(team.length % 2 != 0){
			rows.push([team[team.length-1]]);
		}
		return rows;
	})(team) -->
	
		
	<!-- ko foreach: $data -->
	<div class="row">
	<!-- ko foreach: $data -->
	<div class="col-xs-12 col-sm-5"  style="text-align:center;">
	
	<div class="img-container">
		<img data-bind="attr:{src: '<?php echo IMGS_ADDR.'/team/'; ?>/'+ photo}"  />	
	</div>
	<p>  
		<h4 data-bind="text: name"></h4>
		<small data-bind="text: desc">
		</small>
	</p>
	</div>
	<!-- /ko -->
	</div>
	
	<!-- /ko -->
	
	<!-- /ko -->
	
	<div class="row">
		<div class="col-lg-12 text-center">
			<h2 class="section-heading">Les Horaires</h2>
		</div>
	</div>
	
	<div class="row schedule">
		<?php 
			
			include SITE_ROOT_PATH."/pages/horaire.php";
		?>
	</div>
	
</section>