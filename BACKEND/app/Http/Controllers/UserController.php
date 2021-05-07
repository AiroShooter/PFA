<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    //
    public static function index(){
        $users = DB::select('select * from users');

        return $users;
    }
    public static function register(Request $request){

      

     
           
        $count = User::where('email','=',$request->email)->count();

        if($count == 1)
        {
            return response()->json([
                'hasError' => true,
                'success' => '',
                'error' => 'Duplicate '
            ]);
        }
        if($count == 0){
        
            if($request->isPatient == "true")
                 DB::insert('insert into users (email, password, type) values (?, ?, ?)', [$request->email, $request->password, 'patient']);
             elseif($request->isPatient == "false")
                 DB::insert('insert into users (email, password, type) values (?, ?, ?)', [$request->email, $request->password, 'medecin']);
        
                 return response()->json([
                    'hasError' => false,
                    'success' => 'done ',
                    'error' => ''
                ]);
        
        }
 
   

        
    }
}
