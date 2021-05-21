<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConsultationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consultations', function (Blueprint $table) {
            $table->bigIncrements("const_id");
            $table->unsignedBigInteger("patient_id");
            $table->unsignedBigInteger("med_id");
            $table->unsignedBigInteger("replace_id");
            $table->unsignedBigInteger("doss_id");
            $table->date("date");
            $table->string("type");
            $table->string('desc');
            $table->string('etat');
            $table->string('raison');
            $table->string('heure');
            $table->float('tarif');
            $table->foreign("replace_id")->references("med_id")
            ->on("medecins")->onDelete("cascade")->onUpdate("cascade");
            $table->foreign("patient_id")->references("patient_id")
            ->on("patients")->onDelete("cascade")->onUpdate("cascade");
            $table->foreign("med_id")->references("med_id")
            ->on("medecins")->onDelete("cascade")->onUpdate("cascade");
            $table->foreign("doss_id")->references("doss_id")
            ->on("dossier_medicals")->onDelete("cascade")->onUpdate("cascade"); 

           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('consultations');
    }
}
