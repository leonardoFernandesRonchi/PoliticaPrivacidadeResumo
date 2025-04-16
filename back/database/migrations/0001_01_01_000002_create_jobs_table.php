<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('politicas', function (Blueprint $table) {
            $table->id(); // Cria um campo id auto-incrementável como chave primária
            $table->text('texto'); // Cria um campo texto do tipo TEXT (para conteúdos maiores)
            // Não inclui timestamps (created_at e updated_at) conforme solicitado
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('politicas');
    }
};