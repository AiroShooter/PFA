<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMedecinsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medecins', function (Blueprint $table) {
            $table->bigIncrements('med_id');
            $table->unsignedBigInteger("user_id");
            $table->foreign("user_id")->references("user_id")
                ->on("users")->onDelete("cascade")->onUpdate("cascade");
            $table->unsignedBigInteger("spec_id");
            $table->foreign("spec_id")->references("spec_id")
                ->on("specialites")->onDelete("cascade")->onUpdate("cascade");
            $table->string('titre');
            $table->string('nom');
            $table->string('prenom');
            $table->float('tarif');
            $table->string('siteWeb');
            $table->string('adresseCabinet');
            $table->string('ville');
            $table->string('teleCabinet');
            $table->string('telePerso');
            $table->integer('duree');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('medecins');
    }
}
