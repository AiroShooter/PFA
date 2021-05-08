<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHorairesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('horaires', function (Blueprint $table) {
            $table->bigIncrements("horaire_id");
            $table->unsignedBigInteger('med_id');
            $table->foreign("med_id")->references("med_id")
                ->on("medecins")->onDelete("cascade")->onUpdate("cascade");
            $table->string("jour");
            $table->string('heureDebutMat');
            $table->string('heureFinMat');
            $table->string('heureDebutSoir');
            $table->string('heureFinSoir');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('horaires');
    }
}
