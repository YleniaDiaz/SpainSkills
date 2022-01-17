<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Juego extends Model
{
    use HasFactory;

    public function categorias()
    {
        return $this->belongsToMany(Categoria::class, "juegos_categorias");
    }

    public function rankings()
    {
        return $this->hasMany(Ranking::class);
    }

    public function ultimoRanking()
	{
	    return $this->hasOne(Ranking::class)->latestOfMany();
	}
}
