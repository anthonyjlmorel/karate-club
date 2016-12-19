<?php 
	include "./php-routines/configuration.php";
	
	function my_json_encode($array){
		
		if(function_exists("json_encode")){
			return json_encode($array);
		}
		
		$len = count($array);
		$count = 0;
		
		if($len == 0){
			return "[]";
		}
		
		$keys = array_keys($array);
		if(is_integer($keys[0])){
			$openingChar = "[";
			$closingChar = "]";
		}else{
			$openingChar = "{";
			$closingChar = "}";
		} 
		
		$result = $openingChar;
		foreach($array as $n=>$v){
			
			if(!is_integer($n)){
				$result .= "\"".$n."\":";
			}
			
			if(is_array($v)){
				$result .= my_json_encode($v);
			} else {
				$result .= "\"".$v."\"";
			}
			
			if($count < $len - 1){
				$result .= ",";
			}
			
			$count++;
		}
		
		$result .= $closingChar;
		return $result;
	}
	
	function anwser($array){
		echo "{ \"images\": ".my_json_encode($array)."}";
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
	
	// Code From Stack Overflow
	
	$dirHandler = openDir($galleryPath);
	if($dirHandler){
		
		$entries = array();
		
		
		/* This is the correct way to loop over the directory. */
		while (false !== ($entry = readdir($dirHandler))) {
			if($entry == "." || $entry == "..") continue;
			
			// Generate path for the miniature and the original
			$entries[] = array(
				'img' => SITE_WEB_ADDR."/img/gallery/".$galleryId."/".$entry,
				'mini' => SITE_WEB_ADDR."/img/gallery-min/".$galleryId."/".$entry
			);
		}
	
		closedir($dirHandler);	
		anwser($entries);
	}
	
	anwser(array());
  