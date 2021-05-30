<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TriggerMedRep extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared("
        CREATE TRIGGER med_rep
        AFTER UPDATE ON consultations
        FOR EACH ROW 
        BEGIN 
            if(new.med_id != old.med_id AND new.echanger = 'patient') THEN
                    SELECT concat('Dr. ',concat(nom,concat(' ',prenom))) INTO @titre FROM medecins WHERE med_id = new.med_id;
                    SELECT user_id INTO @user FROM patients WHERE patient_id = new.patient_id;
                    INSERT INTO notification_events (titre, message, etat, date, user) VALUES (@titre,'est votre médecin remplaçant pour votre rendez-vous','unseen',new.date,@user);
             END IF;
        END
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared("DROP TRIGGER med_rep;");
    }
}
