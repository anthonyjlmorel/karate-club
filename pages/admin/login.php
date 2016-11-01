<?php 
	session_start();
	
	$mode = "normal";
	
	if(isset($_POST['name']) && isset($_POST['password'])){
		
		// TODO: store password in an external file
		//		 and modify this
		if($_POST['name'] == "anthony" && $_POST['password'] == 'ha'){
			$_SESSION['user'] = "anthony";
		} else{
			$mode = "error";
		}
		
		
	}
	
	if(isset($_SESSION['user']) && $_SESSION['user']){
		header('Location: '.SITE_WEB_ADDR.'/?p=admin/dashboard');
		die();
	}
	
	
?>

<div class="login">
	
	<?php if($mode == "error"){
		
	?>
	<div class="error">
		Erreur de log in/password.
	</div>	
	<?php } ?>
	
	<form method="post" action="<?php echo SITE_WEB_ADDR; ?>/?p=admin/login">
		<input name="name" type="text" placeholder="login" required/>
		<input name="password" type="password" placeholder="mot de passe" required/>
		
		<input type="submit" value="Log in" />
	</form>
	
</div>
