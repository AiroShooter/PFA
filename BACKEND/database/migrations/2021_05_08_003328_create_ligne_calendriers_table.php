<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLigneCalendriersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ligne_calendriers', function (Blueprint $table) {
            $table->unsignedBigInteger("creneau_id");
            $table->unsignedBigInteger('calen_id');
            $table->primary(array('creneau_id', 'calen_id'));
            $table->string("etat");
            $table->date("date");   
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ligne_calendriers');
    }
}
