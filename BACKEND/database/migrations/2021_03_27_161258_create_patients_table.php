<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->bigIncrements("patient_id");
            $table->unsignedBigInteger("user_id");
            $table->foreign("user_id")->references("user_id")
                ->on("users")->onDelete("cascade")->onUpdate("cascade");
            $table->string('nom');
            $table->string('prenom');
            $table->string('sexe');
            $table->string('telePerso');
            $table->string('pays');
            $table->date('dateNaiss');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patients');
    }
}
