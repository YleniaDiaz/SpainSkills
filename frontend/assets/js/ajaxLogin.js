var urlApi = "http://localhost:8000/api/";

$(function() {

    $("#error").html("");

    $("#login").click(function(e) {

      e.preventDefault();

      $.post(urlApi+"login", {email: $("#email").val(), password: $("#password").val()})
      .done(function(datos){  
        console.log(datos);
        //Obtener token y guardarlo en sesión en admin.html
        location.href = 'admin.html';
      })
      .fail(function(xhr, status, error) {
        // error handling
        $("#error").html("Los datos de acceso no son válidos");
        console.log(error);
      });

	  });

});