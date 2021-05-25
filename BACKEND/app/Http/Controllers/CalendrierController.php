<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use App\Models\calendrier;
use Illuminate\Http\Request;

class CalendrierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        $inserted = DB::insert('INSERT INTO `calendriers`(`med_id`, `date`, `jour`, `heureDebut`, `heureFin`, `patient_id`) VALUES (?,?,?,?,?,?)', [$request->med_id,NULL, $request->jour, $request->heureDebut, $request->heureFin, NULL]);
             
                if($inserted)
                {
                    return response()->json([
                        'hasError' => false,
                        'success' => 'Done',
                        'error' => '']);
                        
                }
                else
                {
                    return response()->json([
                        'hasError' => true,
                        'success' => '',
                        'data' => 'empty',
                        'error' => 'Error']);
                }     

        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    public function check(Request $request)
    {
        return DB::select('SELECT * FROM `calendriers` where med_id = ? order by heureDebut', [$request->med_id]);
    }

    
    

    public function delete(Request $request)
    {
        return DB::delete('delete from calendriers where med_id = ? and jour = ?', [$request->med_id, $request->jour]);

    }
    public function deleteSingle(Request $request)
    {
        return DB::delete('delete from calendriers where calen_id = ?', [$request->calen_id]);

    }

    
    

    public function deleteAll(Request $request)
    {
        return DB::delete('delete from calendriers where med_id = ?', [$request->med_id]);

    }

    public function checkQuery(Request $request)
    {
        $data =  DB::select('SELECT COUNT(*) as count FROM `calendriers` WHERE `jour` = ? and `heureDebut`= ? and `heureFin` = ? and `med_id` = ?',[$request->jour, $request->heureDebut , $request->heureFin, $request->med_id]);

        return $data[0]->count;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\calendrier  $calendrier
     * @return \Illuminate\Http\Response
     */
    public function show(calendrier $calendrier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\calendrier  $calendrier
     * @return \Illuminate\Http\Response
     */
    public function edit(calendrier $calendrier)
    {
        
    }


    


    public function book(Request $request)
    {
        return DB::update('UPDATE `calendriers` SET `date`= ?,`patient_id`= ? WHERE `calen_id`= ?', [$request->date, $request->patient_id, $request->calen_id]);
    }

    public function bookCancel(Request $request)
    {
        return DB::update('UPDATE `calendriers` SET `date`= ?,`patient_id`= ? WHERE `calen_id`= ? AND `patient_id`= ? ', [NUll, NULL, $request->calen_id, $request->patient_id]);
    }


    public function bookCheck(Request $request)
    {
        $result = DB::select('SELECT COUNT(*) as count FROM `calendriers` WHERE `patient_id` = ?', [$request->patient_id]);
        return $result[0]->count;
       
    }
    


   

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\calendrier  $calendrier
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $upda = DB::update('update calendrier set patient_id = (?) where med_id',[$request->patient_id, $request->med_id]);
        if($upda)
        {
           return response()->json([
               'hasError' => false,
               'success' => 'Done',
               'error' => '']);
               
        }
        else{
            return response()->json([
                'hasError' => true,
                'success' => '',
                'data' => 'empty',
                'error' => 'Error']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\calendrier  $calendrier
     * @return \Illuminate\Http\Response
     */
    public function destroy(calendrier $calendrier)
    {
        //
    }
}
