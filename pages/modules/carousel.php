<?php
	
$imgNames = array("slide1.jpg",
				"slide2.jpg",
				"slide3.jpg");

?>
  <!-- Wrapper for slides -->
<div id="mainCarousel" class="carousel slide auto" data-ride="carousel" data-interval="2000">
	  <ol class="carousel-indicators">
		<?php
			foreach($imgNames as $n=>$imgName){
				if($n == 0) {
			?>
			<li data-target="#mainCarousel" data-slide-to="<?php echo $n; ?>" class="active"></li>
			<?php
			} else {
			?>
			<li data-target="#mainCarousel" data-slide-to="<?php echo $n; ?>"></li>
		  <?php
			 }
			}
		  ?>
	  </ol>
	  <div class="carousel-inner">
		<?php
			foreach($imgNames as $n=>$imgName){
			  if($n == 0){
		?>
		<div class="item active">
		<?php
		 } else {
		 ?>
		 <div class="item">
		 <?php
		 }
		 ?>
		  <img alt="Slide" src="<?php echo SITE_WEB_ADDR; ?>/img/carousel/<?php echo $imgName; ?>">
		</div>
		<?php
		}
		?>
	  </div>
	  <a class="left carousel-control" href="#mainCarousel" role="button" data-slide="prev">
		<span class="glyphicon glyphicon-chevron-left"></span>
	  </a>
	  <a class="right carousel-control" href="#mainCarousel" role="button" data-slide="next">
		<span class="glyphicon glyphicon-chevron-right"></span>
	  </a>
</div>
