<?php
	session_start(); 
?>
<!DOCTYPE html>
<html>
	<head>

		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<meta name="api_token" content="<?php if($_SESSION['api_token']) 
			  	echo $_SESSION['api_token'];
			  else
			  	echo '';
		?>">
		<!--meta name="api_token" content="{{ csrf_token() }}"-->
		<meta charset="utf-8">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<script src="assets/js/jquery-3.6.0.min.js"></script>
		<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
		<script src="assets/js/ajax.js"></script>
	</head>
	<body>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
		  <div class="container-fluid">
		  	<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		      <span class="navbar-toggler-icon"></span>
		    </button>
		    <a class="navbar-brand" href="#">Gameskills</a>
		    <div class="collapse navbar-collapse" id="navbarSupportedContent">
		      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
		        <li class="nav-item">
		          <a class="nav-link" href="index.php">Inicio</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" href="juegos.php">Juegos</a>
		        </li>
		    <?php if(!isset($_SESSION['api_token'])){ ?>
		        <li class="nav-item">
		          <a class="nav-link" href="login.php">Login</a>
		        </li>
		    <?php } ?>
		    <?php if(isset($_SESSION['api_token'])){ ?>
		    	<li class="nav-item">
		          <a class="nav-link" href="#" onclick="crearJuego()">Crear juego</a>
		        </li>
		        <li class="nav-item">
		          <a id="logout" class="nav-link" href="#">Cerrar sesión</a>
		        </li>
		    <?php } ?>
		      </ul>
		    </div>
		    <a class="navbar-brand" href="#">
		    	<img src="assets/imagenes/logogameskills.png" alt="" width="100">
		    </a>
		  </div>
		</nav>
		<?php if( isset($_SESSION['api_token']) && $_SESSION['api_token'] != null ) 
				echo "Bienvenido administrador";
		?> 
		<div id="mensaje"></div>