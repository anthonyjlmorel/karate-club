<?php
	$addClass = '';
	if($GLOBALS['currentPage'] == 'w'){
		$addClass = 'main';
	}
?>
<header class="main-header <?php echo $addClass; ?>">
	
	<div class="header-title">
		<a href="<?php echo SITE_WEB_ADDR; ?>">Karat&eacute; Club L&eacute;o Lagrange</a>
	</div>
	<!-- Menu -->
	<?php
		include "./main-menu.php";
	?>
	
</header>