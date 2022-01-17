var urlApi = "http://localhost:8000/api/";
var url = "http://localhost:8080/SpainSkills/ajaxApiLaravel-Bootstrap/";
var rutaImagenes = "http://localhost:8000/imagenes/";
var imagenesaleatorias = [];
var contador=0;

$(function() {
  
  //Header para cuando se inicia sesión
  //Para pasar el token
  $.ajaxSetup({
      xhrFields: { withCredentials: true },
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("api_token"),
        'Accept': 'application/json',
       }
  });

  //index
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

  //juegos
  //juegoscategorias
  $.ajax({
      type: "GET",
      url: urlApi+"categoria",
      success: function(datos){
         var categorias = "<h2>Categorías</h2><ul class='nav flex-column'>";
         for(let i=0; i<datos.length; i++){

          if( localStorage.getItem("api_token") != null ){
            categorias += "<li><a href='#' "+
            "onclick=\"juegosPorCategoriasAdmin("+
            datos[i].id+",'"+datos[i].nombre+
            "')\">"+datos[i].nombre+"</a></li>";
          }else{
            categorias += "<li><a href='#' "+
            "onclick=\"juegosPorCategorias("+
            datos[i].id+",'"+datos[i].nombre+
            "')\">"+datos[i].nombre+"</a></li>";
          }
          
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

  //Login
  $("#error").html("");

  $("#login").click(function(e) {
    //alert("Login");
    e.preventDefault();

    /*$.get( "http://localhost:8000/sanctum/csrf-cookie" )
    .done(function( data ) {
      console.log( "CSRF-COOKIE: " + data );*/

      $.post( urlApi+"login", {email: $("#email").val(), password: $("#password").val()} )
      .done(function( data ) {
        console.log("LOGIN: "+JSON.stringify(data));
        //Obtener token y guardarlo en almacenamiento
        localStorage.setItem("idusuario",data.idusuario);
        localStorage.setItem("api_token",data.access_token);

        $.post(url+"login.php", {api_token: data.access_token})
        .done(function(datos){  
          location.reload();
        });

      })
      .fail(function(xhr, status, error) {
        // error handling
        $("#error").html("Los datos de acceso no son válidos");
        console.log("ERROR LOGIN: "+error);
      });
    //});


  });

  $("#logout").click(function(e) {
    //alert("Logout");
    e.preventDefault();
    //window.location.href=url+"logout.php";
    $.post(urlApi+"logout", {})
    .done(function(datos){  
      console.log(datos);
      localStorage.clear();
      //Obtener token y guardarlo en sesión en admin.html
      window.location.href=url+"logout.php";
    })
    .fail(function(xhr, status, error) {
      // error handling
      console.log(error);
    });

  });

  //ADMIN

});

//Funciones juegos
function juegosPorCategorias(i, nombre){
  $.ajax({
        type: "GET",
        url: urlApi+"categoria/"+i,
        success: function(datos){
          console.log(datos + "TOKEN: "+localStorage.getItem("api_token"));

           juegos = "<h2>Juegos de categoría "+nombre+"</h2><div class='row'>";
           for(let i=0; i<datos.length; i++){

            juegos += "<div class='col-sm'>";

            juegos += "<div class='card' style='width:18rem'>"+
            "<img class='card-img-top' src='http://localhost:8000/imagenes/"+datos[i].imagen+"' alt='Imagen juego' width='50px'/>"+
            "<div class='card-body'><h5 class='card-title'>"+datos[i].titulo+"</h5>";
            juegos += "<a href='#' class='btn btn-primary' onclick=\"verJuego("+datos[i].id+")\">Ver juego</a><hr/>"+
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

function juegosPorCategoriasAdmin(i, nombre){
  $.ajax({
        type: "GET",
        url: urlApi+"categoria/"+i,
        success: function(datos){
          console.log(datos + "TOKEN: "+localStorage.getItem("api_token"));

           juegos = "<h2>Juegos de categoría "+nombre+"</h2>";
           for(let i=0; i<datos.length; i++){

            juegos += "<div class='row'>";
            juegos += "<div class='col-sm'>"+
            "<img src='http://localhost:8000/imagenes/"+datos[i].imagen+"' alt='Imagen juego' width='200px'/>"+
            "</div>";
            juegos += "<div class='col-sm'>"+
            "<p><b>"+datos[i].titulo+"</b></p><p>"+datos[i].descripcion+"</p>";
            juegos += "<p><b>Categorias</b>: ";

            for( let j=0; j<datos[i].categorias.length; j++){
              juegos += datos[i].categorias[j].nombre+" | ";
            }

            juegos += "</p></div>";
            juegos += "<div class='col-sm'>";
            juegos += "<a href='#' class='btn btn-primary' onclick=\"verJuego("+datos[i].id+")\">Ver juego</a>";
            console.log("Idusuario: "+i+", "+datos[i].idusuario);
            if( localStorage.getItem("idusuario") == datos[i].idusuario ){
              juegos += "<hr/><a href='#' class='btn btn-primary' onclick=\"modificarJuego("+datos[i].id+", '"+datos[i].titulo+"')\">Modificar</a>";
            }
            juegos += "</div>";
            juegos += "<hr/></div>";
            
           }
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
            "<a href='#' class='btn btn-primary' onclick=\"verJuego("+datos[i].id+")\">Ver juego</a><hr/>"+
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
            "<a href='#' class='btn btn-primary' onclick=\"verJuego("+datos[i].id+")\">Ver juego</a><hr/>"+
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

function verJuego(id, titulo){
  //Obtenemos el juego i para presentarlo en formulario
  $.ajax({
      type: "GET",
      url: urlApi+"juego/"+id,
      success: function(datos){
       console.log(datos);

       categorias = "";
       for(let i=0; i<datos.categorias.length; i++){
        categorias += datos.categorias[i].nombre+" | ";
       }

       modificar = "";
       if( localStorage.getItem("idusuario") == datos.idusuario ){
        modificar = "<a href='#' class='btn btn-primary' onclick=\"modificarJuego("+datos.id+", '"+datos.titulo+"')\">Modificar</a>";
       }

       console.log("MODIFICAR: "+localStorage.getItem("idusuario")+" - "+modificar);
             
       $('#juegosPorCategorias').html(

        `<h2>Ver juego: ${datos.titulo}</h2>
         <div class="row">
          <div class="col-sm">
            <img src="${rutaImagenes}${datos.imagen}" alt="Imagen" width="200"/>
          </div>
          <div class="col-sm">
            <div class="row">
              <div class="col-sm text-right">
                <b>Nombre</b>:
              </div>
              <div class="col-sm text-left">
                ${datos.titulo}
              </div>
            <div class="row">
              <div class="col-sm text-right">
                <b>Descripción</b>:
              </div>
              <div class="col-sm text-left">
                ${datos.descripcion}
              </div>
            </div>
            <div class="row">
              <div class="col-sm text-right">
                <b>Categorías</b>:
              </div>
              <div class="col-sm text-left">
                ${categorias}
              </div>
            </div>
            <div class="row">
              <div class="col-sm text-right">
                <b>Votos negativos</b>:
              </div>
              <div class="col-sm text-left">
                ${datos.votos_negativos}
              </div>
            </div>
            <div class="row">
              <div class="col-sm text-right">
                <b>Votos positivos</b>:
              </div>
              <div class="col-sm text-left">
                ${datos.votos_positivos}
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm">
              </div>
              <div class="col-sm">
                ${modificar}
              </div>
          </div>
        </div>`

        );
        //alert("Fuera: "+categorias);
   
      }
    });
}

function crearJuego(){
  
    categorias = "";

    $.ajax({
      type: "GET",
      url: urlApi+"categoria",
      success: function(cat){

         for(let i=0; i<cat.length; i++){
          categorias += "<div class='form-group'>"+
            cat[i].nombre+": <input type='checkbox' class='form-check-input' "+
            "name='categoria' value='"+cat[i].id+"'";
          categorias += "></div>";
         }
         
         $('.container').html(

          `<div class="row">
            <div class="col-12">
            <h2>Nuevo Juego</h2>
            <form>
                <div class="form-group">
                  <label for="nombre">Nombre</label>
                  <input type="text" class="form-control" placeholder="Introduzca nombre" 
                  id="titulo" value="" required>
                </div>
                <div class="form-group">
                  <label for="descripcion">Descripción</label>
                  <input type="text" class="form-control" placeholder="Introduzca descripción"
                  id="descripcion" value="" required>
                </div>
                <h4>Categorías</h4>
                <hr/>
                ${categorias}
                <div class="form-group">
                  <label for="imagen">Imagen</label>
                  <input id="imagen" type="file" class="form-control" placeholder="Introduzca imagen"
                  value="">
                  <img src="" alt="Imagen" width="300"/>
                </div>
                <div class="form-group">
                  <label for="votos_negativos">Votos negativos</label>
                  <input type="text" class="form-control" placeholder="Introduzca votos negativos"
                  id="votos_negativos" value="0" required>
                </div>
                <div class="form-group">
                  <label for="votos_positivos">Votos positivos</label>
                  <input type="text" class="form-control" placeholder="Introduzca votos positivos"
                  id="votos_positivos" value="0" required>
                </div>
                <br/>
                <button onClick="crearJuegoInsert()" type="submit" class="btn btn-primary">Guardar</button>
              </form>
              <div style="color: red" id="error"></div>
            </div>
          </div>`

          );
      }
    });

    //alert("Fuera: "+categorias);
}

function crearJuegoInsert(){
    //alert("modificar");
    var categorias = [];
    $('input[name="categoria"]:checked').each(function () {
       categorias.push($(this).val());
    });

    //idusuario: localStorage.getItem("idusuario"),
    //alert(categorias);
    var formData = {
      idusuario: localStorage.getItem("idusuario"),
      titulo: $("#titulo").val(),
      descripcion: $("#descripcion").val(),
      votos_negativos: $("#votos_negativos").val(),
      votos_positivos: $("#votos_positivos").val(),
      categorias: categorias,
      implementado: 0,
    };
    console.log("FORMDATA: ",formData);
    //console.log("IMAGEN: "+imagen);
    //window.location.href=url+"logout.php";
    $.post(urlApi+"juego", formData)
    .done(function(datos){  
      console.log(datos);

      //Guardar imagen
      if( document.getElementById("imagen").files.length > 0 ){

        var formData = new FormData();
        //var imagen = $('#imagen').prop("files")[0];
        var imagen = document.getElementById("imagen").files[0];
        console.log("IMAGEN: ", imagen);
        formData.append("imagen", imagen);

        $.ajax({
            url: urlApi+"subirimagen/"+datos.id,
            //url: "http://localhost:8080/upload.php",
            type: "post",
            contentType: 'multipart/form-data',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        })
        .done(function(datos){
            console.log(JSON.stringify(datos));
        })
        .fail(function(xhr, status, error) {
          // error handling
          console.log("Error imagen: ",JSON.stringify(error));
        });

      }else{
        console.log("ERROR IMAGEN: ", $('#imagen')[0]);
      }

      $("#mensaje").html("Juego creado correctamente");
      //window.location.href=url+"logout.php";
    })
    .fail(function(xhr, status, error) {
      // error handling
      console.log("Error creando juego: ",error);
    });
}

function modificarJuego(id, titulo){
  //Obtenemos el juego id para presentarlo en formulario
  $.ajax({
      type: "GET",
      url: urlApi+"juego/"+id,
      success: function(datos){
        console.log(datos.categorias);
        categorias = "";

        $.ajax({
          type: "GET",
          url: urlApi+"categoria",
          success: function(cat){
             for(let i=0; i<cat.length; i++){
              categorias += "<div class='form-group'>"+
                cat[i].nombre+": <input type='checkbox' class='form-check-input' "+
                "name='categoria' value='"+cat[i].id+"'";

              encontrado = false;
              for(let j=0; j<datos.categorias.length; j++){
                if(datos.categorias[j].id == cat[i].id){
                  encontrado = true;
                  break;
                }
              }

              if(encontrado) categorias += " checked";

              categorias += "></div>";
             }
             
             $('#juegosPorCategorias').html(

              `<div class="row">
                <div class="col-12">
                <h2>Modificando juego: ${titulo}</h2>
                <form>
                    <div class="form-group">
                      <label for="nombre">Nombre</label>
                      <input type="text" class="form-control" placeholder="Introduzca nombre" 
                      id="titulo" value="${datos.titulo}" required>
                    </div>
                    <div class="form-group">
                      <label for="descripcion">Descripción</label>
                      <input type="text" class="form-control" placeholder="Introduzca descripción"
                      id="descripcion" value="${datos.descripcion}" required>
                    </div>
                    <h4>Categorías</h4>
                    <hr/>
                    ${categorias}
                    <div class="form-group">
                      <label for="imagen">Imagen</label>
                      <input id="imagen" type="file" class="form-control" placeholder="Introduzca imagen"
                      value="${datos.descripcion}">
                      <img src="${rutaImagenes}${datos.imagen}" alt="Imagen" width="300"/>
                    </div>
                    <div class="form-group">
                      <label for="votos_negativos">Votos negativos</label>
                      <input type="text" class="form-control" placeholder="Introduzca votos negativos"
                      id="votos_negativos" value="${datos.votos_negativos}" required>
                    </div>
                    <div class="form-group">
                      <label for="votos_positivos">Votos positivos</label>
                      <input type="text" class="form-control" placeholder="Introduzca votos positivos"
                      id="votos_positivos" value="${datos.votos_positivos}" required>
                    </div>
                    <br/>
                    <button onClick="modificarJuegoUpdate(${datos.id})" type="submit" class="btn btn-primary">Guardar</button>
                  </form>
                  <div style="color: red" id="error"></div>
                </div>
              </div>`

              );
          }
        });

        //alert("Fuera: "+categorias);
   
      }
    });
}

function modificarJuegoUpdate(i)
{

    //alert("modificar");
    var categorias = [];
    $('input[name="categoria"]:checked').each(function () {
       categorias.push($(this).val());
    });

    //alert(categorias);
    var formData = {
      titulo: $("#titulo").val(),
      descripcion: $("#descripcion").val(),
      votos_negativos: $("#votos_negativos").val(),
      votos_positivos: $("#votos_positivos").val(),
      categorias: categorias,
    };
    console.log("Datos enviados: ",formData);
    //console.log("IMAGEN: "+imagen);
    //window.location.href=url+"logout.php";
    $.post(urlApi+"juego/"+i, formData)
    .done(function(datos){  
      console.log(datos);
      //Guardar imagen
      if( document.getElementById("imagen").files.length > 0 ){

        var formData = new FormData();
        //var imagen = $('#imagen').prop("files")[0];
        var imagen = document.getElementById("imagen").files[0];
        console.log("IMAGEN: ", imagen);
        formData.append("imagen", imagen);

        $.ajax({
            url: urlApi+"subirimagen/"+i,
            //url: "http://localhost:8080/upload.php",
            type: "post",
            contentType: 'multipart/form-data',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        })
        .done(function(datos){
            console.log(JSON.stringify(datos));
        })
        .fail(function(xhr, status, error) {
          // error handling
          console.log("Error subiendo IMAGEN", JSON.stringify(error));
        });

      }else{
        console.log("ERROR IMAGEN: ", $('#imagen')[0]);
      }

      $("#juegosPorCategorias").html("Modificado correctamente");
      //window.location.href=url+"logout.php";
    })
    .fail(function(xhr, status, error) {
      // error handling
      console.log(error);
    });
}
