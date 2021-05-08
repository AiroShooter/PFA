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
            $table->foreign("calen_id")->references("calen_id")
            ->on("calendriers")->onDelete("cascade")->onUpdate("cascade");
            $table->foreign("creneau_id")->references("creneau_id")
                ->on("creneaus")->onDelete("cascade")->onUpdate("cascade");
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
