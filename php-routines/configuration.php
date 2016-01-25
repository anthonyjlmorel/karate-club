<?php
	// TODO: to be removed in prod
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);
	
	if(isset($_SERVER['SERVER_NAME']) && $_SERVER['SERVER_NAME'] == 'localhost'){
		// Either at home or chris' home
		
		define( 'WEB_SITE_FOLDER', 'karate-club' );
		define( 'SITE_WEB_ADDR', 'http://localhost/'.WEB_SITE_FOLDER);
		
		// antho's dev conf
		define( 'SITE_ROOT_PATH', 'D:/Program Files/BitNami/wampstack-5.4.24-0/apache2/htdocs/' . WEB_SITE_FOLDER );
		
		define('MODE', 'dev');
	}else{
		// Prod
		define( 'WEB_SITE_FOLDER', 'tmp' );
		define( 'SITE_WEB_ADDR', 'http://jacquyk.free.fr/' . WEB_SITE_FOLDER );
		
		define( 'SITE_ROOT_PATH', '/mnt/171/sda/0/a/jacquyk/' . WEB_SITE_FOLDER );
		
		define( 'MODE', 'prod' );
	}
	
	define('IMGS_ADDR',SITE_WEB_ADDR.'/img');
	
	define('CLUB_ADDR', "https://www.google.fr/maps/place/Gymnase+Leclerc/@48.6126229,7.7274584,15z/data=!4m2!3m1!1s0x0:0x51778061577ac8b0?sa=X&ved=0ahUKEwjnxsLoh8PKAhUCuBoKHdWPCrUQ_BIIfjAK");