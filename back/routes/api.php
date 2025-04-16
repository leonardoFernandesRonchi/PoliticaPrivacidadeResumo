<?php

use App\Http\Controllers\Api\PoliticaController;
use App\Http\Middleware\Cors;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware([Cors::class])->group(function () {
    Route::post('/politicas', [PoliticaController::class, 'store']);
});
Route::get('/test', function() {
    return response()->json(['status' => 'OK']);
});
