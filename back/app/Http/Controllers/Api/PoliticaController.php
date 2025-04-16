<?php

namespace App\Http\Controllers\Api;

use App\Models\Politica;
use Illuminate\Http\Request;

class PoliticaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'conteudo' => 'required|string'
        ]);

        $politica = Politica::create([
            'texto' => $request->conteudo
        ]);

        return response()->json([
            'message' => 'Política criada com sucesso',
            'data' => $politica
        ], 201);
    }
}