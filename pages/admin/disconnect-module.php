<div class="quit">
	<div class="username">
		<a href="<?php echo SITE_WEB_ADDR."/?p=admin/dashboard" ?>">
			<?php echo $_SESSION['user']; ?>
		</a>
	</div>
	<form action="<?php echo SITE_WEB_ADDR ?>/?p=admin/dashboard&disconnect=true" method="post">
		<button type="submit">X</button>
	</form>
</div> 