var urlApi = "http://localhost:8000/api/";
var rutaImagenes = "http://localhost:8000/imagenes/";
var imagenesaleatorias = [];
var contador=0;

$(function() {
  	//Se ejecutan al inicio

    $.ajax({
        type: "GET",
        url: urlApi+"imagenesaleatorias",
        success: function(datos){
           imagenesaleatorias = datos;
           $("#imagenesaleatorias").html("<img src='"+rutaImagenes+imagenesaleatorias[0]+"' width='300'/>");
        }
    });

    $("#avanzar").click(function() {
      if( contador == imagenesaleatorias.length - 1 ) contador=0;
      else contador++;
	  $("#imagenesaleatorias").html("<img width='300' src='"+rutaImagenes+imagenesaleatorias[contador]+"'/>");
	});

	$("#retroceder").click(function() {
      if( contador == 0 ) contador=imagenesaleatorias.length - 1;
      else contador--;
	  $("#imagenesaleatorias").html("<img width='300' src='"+rutaImagenes+imagenesaleatorias[contador]+"'/>");
	});

});