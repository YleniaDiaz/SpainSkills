<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeders.
     *
     * @return void
     */
    public function run()
    {
        //Usuarios
        DB::table('users')->insert([
            'name' => 'Samuel',
            'email' => 'smarlor@gmail.com',
            'password' => Hash::make('smarlor'),
        ]);
        DB::table('users')->insert([
            'name' => 'Ylenia',
            'email' => 'ylenia@gmail.com',
            'password' => Hash::make('ylenia'),
        ]);

        //Juegos
        DB::table('juegos')->insert([
            'idusuario' => 1,
            'titulo' => 'Juego 1',
            'descripcion' => 'Juego de tipo Arcade y Estrategia',
            'implementado' => 1,
            'imagen' => 'mario.jpeg',
            'votos_negativos' => 0,
            'votos_positivos' => 0,
            'fechahora' => '2021-11-22 10:00:00',
        ]);
        DB::table('juegos')->insert([
            'idusuario' => 2,
            'titulo' => 'Juego 2',
            'descripcion' => 'Juego de tipo Tablero y Multijugador',
            'implementado' => 0,
            'imagen' => 'minecraft.jpeg',
            'votos_negativos' => 0,
            'votos_positivos' => 0,
            'fechahora' => '2021-11-20 10:00:00',
        ]);

        //Categorias
        DB::table('categorias')->insert([
            'nombre' => 'Arcade',
        ]);
        DB::table('categorias')->insert([
            'nombre' => 'Puzzle',
        ]);
        DB::table('categorias')->insert([
            'nombre' => 'Aventuras',
        ]);
        DB::table('categorias')->insert([
            'nombre' => 'Acción',
        ]);
        DB::table('categorias')->insert([
            'nombre' => 'Tablero',
        ]);
        DB::table('categorias')->insert([
            'nombre' => 'Estrategia',
        ]);
        DB::table('categorias')->insert([
            'nombre' => 'Multijugador',
        ]);

        //Juegos_categorias
        DB::table('juegos_categorias')->insert([
            'juego_id' => 1,
            'categoria_id' => 1,
        ]);
        DB::table('juegos_categorias')->insert([
            'juego_id' => 1,
            'categoria_id' => 6,
        ]);
        DB::table('juegos_categorias')->insert([
            'juego_id' => 2,
            'categoria_id' => 5,
        ]);
        DB::table('juegos_categorias')->insert([
            'juego_id' => 2,
            'categoria_id' => 7,
        ]);

        //Rankings
        DB::table('rankings')->insert([
            'juego_id' => 1,
            'jugador' => 'Ylenia',
            'puntuacion' => 30,
            'fechahora' => '2021-12-01 15:00:00'
        ]);

        DB::table('rankings')->insert([
            'juego_id' => 2,
            'jugador' => 'Samuel',
            'puntuacion' => 15,
            'fechahora' => '2021-12-02 16:30:00'
        ]);

    }
}