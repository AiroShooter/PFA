<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;


class TriggerNotifsMaker extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared("
        CREATE TRIGGER notifs_maker
        AFTER INSERT ON consultations
        FOR EACH ROW 
        BEGIN 
            if(new.etat = 'accepter') OR (new.etat = 'annuler') THEN
                if(new.Echanger = 'medecin') THEN
                    SELECT concat('Dr. ',concat(nom,concat(' ',prenom))) INTO @titre FROM medecins WHERE med_id = new.med_id;
                    SELECT concat('a ',concat(new.etat,' un rendez-vous')) INTO @msg;
                    INSERT INTO notification_events (titre, message, etat, date) VALUES (@titre,@msg,'unseen',new.date);
                END IF;
                IF(new.Echanger = 'patient') THEN
                    SELECT concat('Patient, ',concat(nom,concat(' ',prenom))) INTO @titre FROM medecins WHERE med_id = new.med_id;
                    SELECT concat('a ',concat(new.etat,' un rendez-vous')) INTO @msg;
                    INSERT INTO notification_events (titre, message, etat, date) VALUES (@titre,@msg,'unseen',new.date);
                END IF;
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
        DB::unprepared("DROP TRIGGER notifs_maker;");
    }
}
