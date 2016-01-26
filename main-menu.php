<!-- Navigation -->
<div class="main-menu">
	<div class="toggle fa fa-align-justify collapsed">
		
	</div>
	
	<ul>
		<?php
			foreach($GLOBALS['menu'] as $key=>$inner){
				
		?>
		<li class="<?php 
			
			if($GLOBALS['currentPage'] == $key){
				echo 'active';
			}
		 ?>">
			<a href="<?php echo SITE_WEB_ADDR.'/?p='.$key ?>"><?php echo $inner['title']; ?></a>
		</li>
		
		<?php
			}
		?>
	</ul>
</div>
