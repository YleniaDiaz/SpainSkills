<?php include 'header.php'; ?>
<?php
	if( isset($_SESSION['api_token']) ){
?>
		<div class="container text-center">
			<div class="row">
			<div class="col-12">
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
			</div>
			</div>
		</div>
<?php
	}else header("Location: login.php");
?>
<?php include 'footer.php'; ?>