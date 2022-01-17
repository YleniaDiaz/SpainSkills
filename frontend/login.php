<?php include 'header.php'; ?>
<?php
$logueado = false;
if( !isset($_SESSION['api_token']) ){
	//NO está logueado
	echo "NO esta logueado<br/>";
	if( isset($_POST['api_token']) ){
		echo "Hay post token y se guarda en sesión<br/>";
		$_SESSION['api_token'] = $_POST['api_token'];
		
		$logueado = true;
	}
}else $logueado = true;
?>
		<div class="container text-center">
			<div class="row">
				<div class="col-12">
<?php
	if( !$logueado ){
?>
					<form>
					  <div class="form-group">
					    <label for="usuario">Usuario (email)</label>
					    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Introduzca usuario">
					  </div>
					  <div class="form-group">
					    <label for="clave">Clave</label>
					    <input type="password" class="form-control" id="password" placeholder="Introduzca clave" id="password">
					  </div>
					  <button id="login" type="submit" class="btn btn-primary">Submit</button>
					</form>
					<div style="color: red" id="error"></div>
					<div id="prueba"></div>
<?php
	}else{
		echo "Bienvenido a la zona de administración";
	}
?>
				</div>
			</div>
		</div>

<?php include 'footer.php'; ?>