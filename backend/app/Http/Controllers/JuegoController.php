<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use App\Models\Juego;
use App\Models\Ranking;
use App\Models\Categoria;
use App\Models\Historico;

class JuegoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //Hay parametros
        if( $request->descripcion != "" && $request->idcategoria != "" ){

            $juegos = Juego::with('categorias')
                ->where("descripcion", 'LIKE', "%".$request->descripcion."%")
                ->where("categorias.categoria_id", '=', $request->idcategoria)
                ->get();

        }else if($request->descripcion != ""){

            $juegos = Juego::with('categorias')
                ->where("descripcion", 'LIKE', "%".$request->descripcion."%")
                ->get();

        }else if($request->idcategoria != ""){

            /*$juegos = Juego::with('categorias')
                ->where("categorias.categoria_id", '=', $request->idcategoria)
                ->get();*/
            /*$juegos = Juego::with('categorias')
                ->where('pivot.categoria_id', '=', $request->idcategoria)
                ->get();*/
            $categoria = Categoria::with('juegos')
                ->where('id', '=', $request->idcategoria)
                ->get();

            $juegos = $categoria[0]->juegos;
            /*$juegos = $todosJuegos; //array();
            foreach( $todosJuegos as $juego ){
                if(in_array($juego->pivot))
            }*/


        }else
            $juegos = Juego::with('categorias')
                        ->get();

        return $juegos;
    }

    public function getultimosjugados()
    {
        
        /*$ultimosJuegos = DB::table('juegos')->limit(10)
            ->join('rankings', 'juegos.id', '=', 'rankings.juego_id')
            ->join('juegos_categorias', 'juegos.id', '=', 'juegos_categorias.juego_id')
            ->join('categorias', 'categorias.id', '=', 'juegos_categorias.categoria_id')
            ->select('juegos.*', 'categorias.nombre')
            ->orderBy('rankings.fechahora', 'desc')
            ->distinct()
            ->get();*/

        $ultimosJuegos = Juego::join('rankings', 'juegos.id', '=', 'rankings.juego_id')
            ->join('juegos_categorias', 'juegos.id', '=', 'juegos_categorias.juego_id')
            ->join('categorias', 'categorias.id', '=', 'juegos_categorias.categoria_id')
            ->orderBy('rankings.fechahora', 'desc')
            ->distinct()
            ->with('categorias')
            ->get('juegos.*');

        return $ultimosJuegos;
    }

    public function getnovedades()
    {

        $ultimosJuegos = Juego::orderBy('fechahora', 'desc')
            ->distinct()
            ->with('categorias')
            ->get();

        return $ultimosJuegos;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
            'categorias' => 'required',
            'votos_negativos' => 'required',
            'votos_positivos' => 'required',
        ]);
        
        $juego = new Juego();
        $juego->idusuario = $request->idusuario;
        $juego->titulo = $request->titulo;
        $juego->descripcion = $request->descripcion;
        $juego->imagen = ""; //Despues se carga
        $juego->votos_negativos = $request->votos_negativos;
        $juego->votos_positivos = $request->votos_positivos;
        $juego->fechahora = date("Y-m-d H:i:s");
        $juego->implementado = $request->implementado?1:0;
        $juego->save();

        //Después de crear el juego se crean sus categorias 
        if( isset($request->categorias) )
        foreach($request->categorias as $categoria){
            DB::table('juegos_categorias')
            ->insert([
                'juego_id' => $juego->id,
                'categoria_id' => $categoria,
            ]); 
        }   

        return $juego;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $juego = Juego::with('categorias')->find($id);
        return $juego;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $validatedData = $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
            'categorias' => 'required',
            'votos_negativos' => 'required',
            'votos_positivos' => 'required',
        ]);

        $juego = Juego::find($id);
        $juego->titulo = $request->titulo;
        $juego->descripcion = $request->descripcion;
        $juego->votos_negativos = $request->votos_negativos;
        $juego->votos_positivos = $request->votos_positivos;
        $juego->implementado = $request->implementado?1:0;

        $juego->save();

        //Actualizamos categorías
        DB::table('juegos_categorias')
            ->where('juego_id', '=', $juego->id)
            ->delete(); 

        if( isset($request->categorias) )
        foreach($request->categorias as $categoria){
            DB::table('juegos_categorias')
            ->insert([
                'juego_id' => $id,
                'categoria_id' => $categoria,
            ]); 
        }   

        return $juego;
    }

    public function subirimagen(Request $request, $id)
    {
        //return $request->imagen;

        $request->validate([
            'imagen' => 'image|mimes:jpeg,png,jpg,gif,svg|max:102400',
        ]);

        $nombreImagen = time().'.'.$request->imagen->extension();  
        $request->imagen->move(public_path('imagenes'), $nombreImagen);

        $juego = Juego::find($id);
        $juego->imagen = $nombreImagen;
        $juego->save();

        return true;

    }

    public function historico(Request $request)
    {

        $historico = new Historico();
        $historico->idusuario=$request->id;
        $historico->fechahora=date("Y-m-d H:i:s");
        $historico->save();

        return $historico;

    }

    public function imagenesaleatorias()
    {
        $juegos = Juego::select('imagen')->get();
        $imagenes = array();
        foreach($juegos as $juego){
            $imagenes[] = $juego->imagen;
        }
        shuffle($imagenes);
        return $imagenes;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $juego = Juego::find($id)->delete();
        if( $juego ) 
            return true;
        else
            return false;
    }
}
