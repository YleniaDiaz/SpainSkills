var urlApi = "http://localhost:8000/api/";

$(function() {
  	//Se ejecutan al inicio
    //juegoscategorias
    $.ajax({
        type: "GET",
        url: urlApi+"categoria",
        success: function(datos){
           var categorias = "<h2>Categorías</h2><ul class='nav flex-column'>";
           for(let i=0; i<datos.length; i++){
           	categorias += "<li><a href='#' "+
            "onclick=\"juegosPorCategorias("+
            datos[i].id+",'"+datos[i].nombre+
            "')\">"+datos[i].nombre+"</a></li>";
           }
           categorias += "</ul>";
           categorias += "<h2>Novedades</h2><ul class='nav flex-column'>";
           categorias += "<li><a href='#' "+
            "onclick='novedades("+
            ")'>Juegos nuevos</a></li>";
            categorias += "</ul>";
           categorias += "<h2>Últimos</h2><ul class='nav flex-column'>";
           categorias += "<li><a href='#' "+
            "onclick='ultimosJugados("+
            ")'>Últimos jugados</a></li>";
           categorias += "</ul>";
           $("#categorias").html(categorias);
        }
    });

});

function juegosPorCategorias(i, nombre){
  $.ajax({
        type: "GET",
        url: urlApi+"categoria/"+i,
        success: function(datos){
           juegos = "<h2>Juegos de categoría "+nombre+"</h2><div class='row'>";
           for(let i=0; i<datos.length; i++){

            juegos += "<div class='col-sm'>";

            juegos += "<div class='card' style='width:18rem'>"+
            "<img class='card-img-top' src='http://localhost:8000/imagenes/"+datos[i].imagen+"' alt='Imagen juego' width='50px'/>"+
            "<div class='card-body'><h5 class='card-title'>"+datos[i].titulo+"</h5>"+
            //"<p class='card-text'>"+datos[i].descripcion+"</p>"+
            "<a href='#' class='btn btn-primary'>Ranking</a><hr/>"+
            "<h6>Categorias: ";

            for( let j=0; j<datos[i].categorias.length; j++){
              juegos += datos[i].categorias[j].nombre+" | ";
            }

            juegos += "</h6>";
            
            juegos += "</div></div></div>";
            
           }
           juegos += "</div>";
           $("#juegosPorCategorias").html(juegos);
        }
    });
}

function novedades(){
  $.ajax({
        type: "GET",
        url: urlApi+"novedades/",
        success: function(datos){
           juegos = "<h2>Juegos nuevos</h2><div class='row'>";
           for(let i=0; i<datos.length; i++){

            juegos += "<div class='col-sm'>";

            juegos += "<div class='card' style='width:18rem'>"+
            "<img class='card-img-top' src='http://localhost:8000/imagenes/"+datos[i].imagen+"' alt='Imagen juego'/>"+
            "<div class='card-body'><h5 class='card-title'>"+datos[i].titulo+"</h5>"+
            //"<p class='card-text'>"+datos[i].descripcion+"</p>"+
            "<a href='#' class='btn btn-primary'>Ranking</a><hr/>"+
            "<h6>Categorias: ";

            for( let j=0; j<datos[i].categorias.length; j++){
              juegos += datos[i].categorias[j].nombre+" | ";
            }

            juegos += "</h6>";
            
            juegos += "</div></div></div>";
            
           }
           juegos += "</div>";
           $("#juegosPorCategorias").html(juegos);
        }
    });
}

function ultimosJugados(){
  $.ajax({
        type: "GET",
        url: urlApi+"ultimosjugados/",
        success: function(datos){
           juegos = "<h2>Últimos jugados</h2><div class='row'>";
           for(let i=0; i<datos.length; i++){

            juegos += "<div class='col-sm'>";

            juegos += "<div class='card' style='width:18rem'>"+
            "<img class='card-img-top' src='http://localhost:8000/imagenes/"+datos[i].imagen+"' alt='Imagen juego'/>"+
            "<div class='card-body'><h5 class='card-title'>"+datos[i].titulo+"</h5>"+
            //"<p class='card-text'>"+datos[i].descripcion+"</p>"+
            "<a href='#' class='btn btn-primary'>Ranking</a><hr/>"+
            "<h6>Categorias: ";

            for( let j=0; j<datos[i].categorias.length; j++){
              juegos += datos[i].categorias[j].nombre+" | ";
            }

            juegos += "</h6>";
            
            juegos += "</div></div></div>";
            
           }
           juegos += "</div>";
           $("#juegosPorCategorias").html(juegos);
        }
    });
}
