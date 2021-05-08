<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->bigIncrements("message_id");
            $table->unsignedBigInteger("patient_id");
            $table->foreign("patient_id")->references("patient_id")
                ->on("patients")->onDelete("cascade")->onUpdate("cascade");
            $table->unsignedBigInteger("room_id");
            $table->foreign("room_id")->references("room_id")
            ->on("rooms")->onDelete("cascade")->onUpdate("cascade");
            $table->string("message");
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
        Schema::dropIfExists('messages');
    }
}
