<?php
	include './php-routines/configuration.php';
	
	$scripts = array(
		"js/jquery.js",
		"js/bootstrap.js",
		"js/knockout-3.4.0.js",
		"js/zabuto_calendar.min.js",
		"js/p-scripts/main-menu.js"
	);
	
	$links = array(
		"css/bootstrap.css",
		"css/main.css",
		"css/theme.css",
		"font-awesome/css/font-awesome.css",
		"css/zabuto_calendar.css",
		"css/breakpoint.css",
		"http://fonts.googleapis.com/css?family=Montserrat:400,700",
		"http://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700",
		"http://fonts.googleapis.com/css?family=Kaushan+Script",
		'http://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic'
	);
	
	$GLOBALS['menu'] = array(
		'club' => array(
			'title' => 'Le Club'
		),
		'team' => array(
			'title' => "Organisation"
		),
		'calendar' => array(
			'title' => "Calendrier"
		),
		'results' => array(
			'title' => "R&eacute;sultats"
		),
		/*'karate' => array(
			'title' => "Le Karat&eacute;"
		),*/
		'contact' => array(
			'title' => "Contact"
		)
	);
	
	$currentPage = 'w';
	if(isset($_GET) && isset($_GET['p'])){
		if( array_key_exists($_GET['p'], $GLOBALS['menu'])){
			$currentPage = $_GET['p'];
		}
	}
	
	if(!file_exists(SITE_ROOT_PATH.'/pages/'.$currentPage.'.php')){
		$currentPage = 'w';
	}
	
	if(file_exists(SITE_ROOT_PATH.'/js/p-scripts/'.$currentPage.'.js')){
		array_push($scripts, 'js/p-scripts/'.$currentPage.'.js');
	}
	
	$GLOBALS['currentPage'] = $currentPage;
	$bodyClass = $currentPage == "w" ? 'welcome' : '';
	
	
?>
<!DOCTYPE html>
<html lang="fr">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Karaté Club Schiltigheim">
    <meta name="author" content="Anthony Morel">

    <title>Karat&eacute; Club L&eacute;o Lagrange</title>

	<?php
		foreach($links as $n=>$src){
	?>
	<link href="<?php echo $src; ?>" rel="stylesheet" type="text/css" />
	<?php
		}
	?>
	
</head>

<body class="<?php echo $bodyClass; ?>">
	<!-- Main header -->
	<?php
		include "./main-header.php";
	?>
	
	<?php
		if($currentPage == 'w'){
			include SITE_ROOT_PATH.'/pages/'.$currentPage.'.php';
		} else {
	?>
	
	<section class="container page">
	
	
	<!-- Page Content -->
	
	<section class="content">
		<?php 
			include SITE_ROOT_PATH.'/pages/'.$currentPage.'.php';
		?>
	</section>
	
	
	
	<!-- Footer -->
	<?php
		include "./main-footer.php";
		}
		
	?>
	
	</section>

	<?php
	foreach($scripts as $n => $src){
	?>
	<script type="text/javascript" src="<?php echo $src; ?>"></script>
	<?php
	}
	
	if(MODE == 'prod'){
		// Insert Google Analytics
	?>
	<script type="text/javascript">
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		
		ga('create', 'UA-72964874-1', 'auto');
		ga('send', 'pageview');
		
		</script>
	<?php
	}
	?>
    
	
</body>

</html>
