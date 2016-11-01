<?php 
	session_start();
	
	if(isset($_GET['disconnect'])){
		$_SESSION = array();
		session_destroy();
	}
	
	if(!isset($_SESSION['user'])){
		header('Location: '.SITE_WEB_ADDR.'/?p=admin/login');
		die();
	}
	
	
	$cartouches = array(
		
		"carousel" => array(
			"url" => SITE_WEB_ADDR."/?p=admin/carousel",
			"image" => SITE_WEB_ADDR."/img/club-logo.jpg",
			"desc" => "Modifier le Carousel"
		),
		"team" => array(
			"url" => SITE_WEB_ADDR."/?p=admin/team",
			"image" => SITE_WEB_ADDR."/img/club-logo.jpg",
			"desc" => "Modifier l'équipe encadrante"
		),
		"calendrier" => array(
			"url" => SITE_WEB_ADDR."/?p=admin/calendar",
			"image" => SITE_WEB_ADDR."/img/club-logo.jpg",
			"desc" => "Modifier le calendrier"
		),
		"results" => array(
			"url" => SITE_WEB_ADDR."/?p=admin/results",
			"image" => SITE_WEB_ADDR."/img/club-logo.jpg",
			"desc" => "Modifier les résultats"
		)
	);
?>

<div class="dashboard">

	<?php include SITE_ROOT_PATH."/pages/admin/disconnect-module.php"; ?>
	
	<div class="cartouches"> 
		
		<?php foreach($cartouches as $k => $cartouche){ ?>
		<div class="cartouche">
			<a href="<?php echo $cartouche['url']; ?>">
			<div class="cartouche-image">
				<img src="<?php echo $cartouche['image']; ?>" />
			</div>
			<div class="cartouche-description">
				<?php echo $cartouche['desc']; ?>
			</div>
			</a>
		</div>
		<?php } ?>
	
	</div>
</div>

</div>
