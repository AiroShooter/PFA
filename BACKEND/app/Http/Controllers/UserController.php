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

    public static function verifyPass(Request $request){
        $value = DB::select("select * from users where user_id = ?",[$request->user_id]);
        if($value){
            $oldPassword = Crypt::decryptString($value[0]->password); 
            if($oldPassword == $request->opassword){
                $encrypted = Crypt::encryptString($request->password);
                $update = DB::update("update users set password = ? where user_id = ?",[$encrypted,$request->user_id]);
                if($update){
                    $value1 = DB::select("select * from users where user_id = ?",[$request->user_id]);
                    return response()->json([
                        'hasError' => false,
                        'success' => 'Votre mot de passe a ete changé avec success',
                        'error' => '',
                        'user' =>$value1[0]
                    ]);
                }         
            }
            else{
                return response()->json([
                    'hasError' => true,
                    'success' => '',
                    'error' => 'Ancien mot de passe est incorrect'
                ]);
            }
        }
       
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
        
            if($request->isPatient && $request->isPatient == "true")
                 DB::insert('insert into users (email, password, type, isActive) values (?, ?, ?, ?)', [$request->email, $encrypted, 'patient', 1]);
             elseif($request->isPatient && $request->isPatient == "false")
                 DB::insert('insert into users (email, password, type, isActive) values (?, ?, ?, ?)', [$request->email, $encrypted, 'medecin', 1]);
            elseif($request->type == "admin")
                 DB::insert('insert into users (email, password, type, isActive) values (?, ?, ?, ?)', [$request->email, $encrypted, 'admin', 1]);
        
                 $users = DB::select('select * from users where email = ?',[$request->email]);
                 if($users)
                 {
                    if($users[0]->type == 'admin')
                    {
                        DB::insert('INSERT INTO `admins`(`user_id`, `nom`, `prenom`) VALUES (?, ?, ?)', [$users[0]->user_id, $request->nom, $request->prenom]);
                        $admin = DB::select('select * from admins where user_id = ?',[$users[0]->user_id]);

                        return response()->json([
                            'hasError' => false,
                            'success' => 'Done ',
                            'error' => '',
                            'user' =>$users[0],
                            'admin' =>$admin[0]
                        ]);
                    }

                    return response()->json([
                        'hasError' => false,
                        'success' => 'Done ',
                        'error' => '',
                        'user' =>$users[0],
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

        $users = DB::select('select * from users where email = ? and isActive = ?',[$request->email,1]);

        if($users)
        {
            $password = Crypt::decryptString($users[0]->password);  

            if($password == $request->password)
            {
                if($users[0]->type == 'admin')
                {
                    $admin = DB::select('select * from admins where user_id = ?',[$users[0]->user_id]);

                    return response()->json([
                        'hasError' => false,
                        'success' => 'Done',
                        'error' => '',
                        'admin' => $admin[0],
                        'user' =>$users[0],
                    ]);
                }

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
                    'error' => "Ce compte n'existe pas, veuillez essayer de vous s'inscrire d'abord"]);
        }
    }
}
