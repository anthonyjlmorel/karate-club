<?php 
	include SITE_ROOT_PATH."/php-routines/PHPExcel-1.8/Classes/PHPExcel/IOFactory.php";

	$fileName = SITE_ROOT_PATH."/pages/modules/results/001 resultats open kata du 14 novembre 2015 a bouxwiller.xlsx";
	
	$objPHPExcel = PHPExcel_IOFactory::load($fileName);
	
	$sheetData = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
	var_dump($sheetData);
?>


<section class="results">
</section>