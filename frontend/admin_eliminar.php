<?php include 'header.php'; ?>
<?php
	if( isset($_SESSION['api_token']) ){
?>
		<div class="container text-center">
			<div class="row">
				<div id="categorias" class="col-3">
					<h2>Categorías</h2>
				</div>
				<div id="juegosPorCategorias" class="col-9">
					
				</div>
			</div>
		</div>
<?php
	}else header("Location: login.php");
?>
<?php include 'footer.php'; ?>