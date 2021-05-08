<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Crypt;


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
                'error' => 'Cet e-mail existe déjà, veuillez en essayer un autre'
            ]);
        }
        if($count == 0){

            $encrypted = Crypt::encryptString($request->password);  
        
            if($request->isPatient == "true")
                 DB::insert('insert into users (email, password, type) values (?, ?, ?)', [$request->email, $encrypted, 'patient']);
             elseif($request->isPatient == "false")
                 DB::insert('insert into users (email, password, type) values (?, ?, ?)', [$request->email, $encrypted, 'medecin']);
        

                 $users = DB::select('select * from users where email = ?',[$request->email]);
                 if($users)
                 {
                    return response()->json([
                        'hasError' => false,
                        'success' => 'Done ',
                        'error' => '',
                        'user' =>$users[0]
                    ]);
                 }
                 return response()->json([
                    'hasError' => false,
                    'success' => 'Done ',
                    'error' => ''
                ]);
        
        }
 
   

        
    }

    public static function login(Request $request){

        $users = DB::select('select * from users where email = ?',[$request->email]);

        if($users)
        {
            $password = Crypt::decryptString($users[0]->password);  

            if($password == $request->password)
            {
                return response()->json([
                    'hasError' => false,
                    'success' => 'Done',
                    'error' => '',
                    'user' =>$users[0],
                ]);

            }
            else{
                return response()->json([
                    'hasError' => true,
                    'success' => '',
                    'error' => 'Ce mot de passe est incorrect, veuillez vérifier vos informations']);
            }

           
        }
        else{
                
                return response()->json([
                    'hasError' => true,
                    'success' => '',
                    'error' => "Ce compte n'existe pas, veuillez essayer de vous inscrire d'abord"]);
        }
 
   

        
    }
}
