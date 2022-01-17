<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        //http://localhost:4200,
        return $next($request)
          //Url a la que se le dará acceso en las peticiones
          ->header("Access-Control-Allow-Origin", "http://localhost")
          //Métodos que a los que se da acceso
          ->header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
          //Headers de la petición
          ->header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Application, X-Token-Auth")
          ->header("Access-Control-Allow-Credentials", "true")
          ; 
          //X-Token-Auth, Authorization
          //
    }
}
