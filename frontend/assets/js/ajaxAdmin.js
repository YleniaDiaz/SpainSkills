var urlApi = "http://localhost:8000/api/";

$(function() {

    $.ajaxSetup({
      headers: {
        //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        //'Authorization': 'Bearer ' + $('meta[name="api_token"]').attr('content'),
        'Authorization': 'Bearer ' + "6|3a7mOtew5duBGB3XUn7A9WdIGJxMNqO6yiDtpFWe",
        'Accept': 'application/json',
       }
    });

    /*'Content-Type': 'application/json',
        'Accept': 'application/json',*/

    $.get(urlApi+"user", {})
    .done(function(datos){ 
      alert("Autenticado"); 
      console.log(datos);
      //Obtener to
      //location.href = 'admin.html';
    })
    .fail(function(xhr, status, error) {
      // error handling
      //$("#error").html("Los datos de acceso no son válidos");
      alert("NO Autenticado"); 
      console.log(error);
    });


    $("#login").click(function(e) {

      e.preventDefault();

      $.post(urlApi+"login", {email: $("#email").val(), password: $("#password").val()})
      .done(function(datos){  
        console.log(datos);
        location.href = 'admin.html';
      })
      .fail(function(xhr, status, error) {
        // error handling
        $("#error").html("Los datos de acceso no son válidos");
        console.log(error);
      });

	  });

});