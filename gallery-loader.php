<?php 
	include "./php-routines/configuration.php";
	
	
	if(!function_exists("json_encode")){
		
		function json_encode($array){
			$result = "[";
			$len = count($array);
			foreach($array as $n=>$v){
				$result .= "\"".$v."\"";
				
				if($n < $len - 1){
					$result .= ",";
				}
			}
			
			$result .= "]";
			return $result;
		}
	}
	
	function anwser($array){
		echo "{ \"images\": ".json_encode($array)."}";
		die();
	}
	
	
	$galleryPath = SITE_ROOT_PATH."/img/gallery/";
	$galleryId = "";
	
	if(isset($_GET) && isset($_GET['gallery'])){
		$galleryId = $_GET['gallery'];
		
		if(strrpos($galleryId, ".") != false || strrpos($galleryId, "..") != false){
			anwser(array());
		}
		
		$galleryPath .= $galleryId;
	}else{
		anwser(array());
	}
	
	$dirHandler = openDir($galleryPath);
	if($dirHandler){
		
		$entries = array();
		
		/* This is the correct way to loop over the directory. */
		while (false !== ($entry = readdir($dirHandler))) {
			if($entry == "." || $entry == "..") continue;
			$entries[] = SITE_WEB_ADDR."/img/gallery/".$galleryId."/".$entry;
		}
	
		closedir($dirHandler);	
		anwser($entries);
	}
	
	anwser(array());
  