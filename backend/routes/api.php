<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/prueba', function (Request $request) {
    return true;
});

Route::post('/login', 'App\Http\Controllers\AuthController@login');

/*
Route::group(['middleware' => ['cors']], function () {
	
    //Juegos: Rutas a las que se permitirá acceso
    Route::get('/juego', 'App\Http\Controllers\JuegoController@index');
    Route::post('/juego', 'App\Http\Controllers\JuegoController@store');
    Route::get('/juego/{id}', 'App\Http\Controllers\JuegoController@show');
    Route::post('/juego/{id}', 'App\Http\Controllers\JuegoController@update');

    Route::delete('/juego/{id}', 'App\Http\Controllers\JuegoController@destroy');
    Route::get('/ultimosjugados', 'App\Http\Controllers\JuegoController@getultimosjugados');
    Route::get('/novedades', 'App\Http\Controllers\JuegoController@getnovedades');

    //Categorias: Rutas a las que se permitirá acceso
    Route::get('/categoria', 'App\Http\Controllers\CategoriaController@index');
    
    
    //Historicos
    Route::post('/historico', 'App\Http\Controllers\JuegoController@historico');

    //Imagenes
    Route::post('/subirimagen/{id}', 'App\Http\Controllers\JuegoController@subirimagen');
    Route::get('/imagenesaleatorias', 'App\Http\Controllers\JuegoController@imagenesaleatorias');
    

});
*/

/*
Route::post('/login', 'App\Http\Controllers\AuthController@login');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['cors']], function () {
    
    //Juegos: Rutas a las que se permitirá acceso
    Route::get('/juego', 'App\Http\Controllers\JuegoController@index');
    
    Route::get('/ultimosjugados', 'App\Http\Controllers\JuegoController@getultimosjugados');
    Route::get('/novedades', 'App\Http\Controllers\JuegoController@getnovedades');

    //Categorias: Rutas a las que se permitirá acceso
    Route::get('/categoria', 'App\Http\Controllers\CategoriaController@index');
    Route::get('/categoria/{id}', 'App\Http\Controllers\CategoriaController@show');

    //Imagenes
    Route::get('/imagenesaleatorias', 'App\Http\Controllers\JuegoController@imagenesaleatorias');

});

Route::group(['middleware' => ['cors', 'auth:sanctum']], function () {
    
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');

    //Juegos: Rutas a las que se permitirá acceso
    Route::get('/juego/{id}', 'App\Http\Controllers\JuegoController@show');
    Route::post('/juego', 'App\Http\Controllers\JuegoController@store');
    Route::post('/juego/{id}', 'App\Http\Controllers\JuegoController@update');

    Route::delete('/juego/{id}', 'App\Http\Controllers\JuegoController@destroy');
    
    //Historicos
    Route::post('/historico', 'App\Http\Controllers\JuegoController@historico');

    //Imagenes
    Route::post('/subirimagen/{id}', 'App\Http\Controllers\JuegoController@subirimagen');

});
*/

Route::group(['middleware' => ['cors']], function () {
    
    //Juegos: Rutas a las que se permitirá acceso
    Route::get('/juego', 'App\Http\Controllers\JuegoController@index');
    Route::get('/juego/{id}', 'App\Http\Controllers\JuegoController@show');
    Route::get('/ultimosjugados', 'App\Http\Controllers\JuegoController@getultimosjugados');
    Route::get('/novedades', 'App\Http\Controllers\JuegoController@getnovedades');

    //Categorias: Rutas a las que se permitirá acceso
    Route::get('/categoria', 'App\Http\Controllers\CategoriaController@index');
    Route::get('/categoria/{id}', 'App\Http\Controllers\CategoriaController@show');

    //Imagenes
    Route::get('/imagenesaleatorias', 'App\Http\Controllers\JuegoController@imagenesaleatorias');

});

Route::group(['middleware' => ['cors', 'auth:sanctum']], function () {

    Route::post("/logout", 'App\Http\Controllers\AuthController@logout');

    //Juegos: Rutas a las que se permitirá acceso
    Route::post('/juego', 'App\Http\Controllers\JuegoController@store');
    Route::post('/juego/{id}', 'App\Http\Controllers\JuegoController@update');

    Route::delete('/juego/{id}', 'App\Http\Controllers\JuegoController@destroy');
    
    //Historicos
    Route::post('/historico', 'App\Http\Controllers\JuegoController@historico');

    //Imagenes
    Route::post('/subirimagen/{id}', 'App\Http\Controllers\JuegoController@subirimagen');

});






