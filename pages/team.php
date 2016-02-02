<section class="container team">
	<div class="row">
		<div class="col-lg-12 text-center">
			<h2 class="section-heading">L'Equipe</h2>
		</div>
	</div>
	
	<div class="row">
	
	
	<!-- ko foreach: team -->
	
	<div class="col-xs-12 col-sm-5"  style="text-align:center;">
	
	  <img width="140" data-bind="attr:{src: '<?php echo IMGS_ADDR.'/team/'; ?>/'+ photo}" class="img-thumbnail" />
	  <p>
		<h4 data-bind="text: name"></h4>
	  <small data-bind="text: desc">
	  
	  </small>
	  </p>
	</div>
	<!-- /ko -->
	
	</div>
	
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