<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCalendriersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('calendriers', function (Blueprint $table) {
            $table->bigIncrements("calen_id");
            $table->unsignedBigInteger('med_id');
            $table->foreign("med_id")->references("med_id")
                ->on("medecins")->onDelete("cascade")->onUpdate("cascade");
            $table->date("date")->nullable();
            $table->string("jour");
            $table->time("heureDebut");
            $table->time("heureFin");
            $table->Integer("patient_id")->nullable();


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('calendriers');
    }
}
