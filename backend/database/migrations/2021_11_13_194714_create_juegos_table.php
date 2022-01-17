<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJuegosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('juegos', function (Blueprint $table) {
            $table->id();
            $table->integer('idusuario');
            $table->string('titulo');
            $table->string('descripcion', 1024);
            $table->boolean('implementado');
            $table->string('imagen');
            $table->integer('votos_negativos');
            $table->integer('votos_positivos');
            $table->datetime('fechahora');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('juegos');
    }
}
