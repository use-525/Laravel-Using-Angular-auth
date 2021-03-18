<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Response;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
class senPasswordResetLink extends Controller
{
    //
    public function sendEmail(Request $request){
        if(!$this->validateEmail($request->email)){
            return $this->failedReponse();
        }
        $this->send($request->email);
        return $this->successReponse();
    }
    public function send($email){
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }
    public function createToken($email){
        $oldToken = DB::table('password_resets')->where('email',$email)->first();
        if($oldToken){
            return  $oldToken->token;
        }
        $token = str_random(60);
        $this->saveToken($token,$email);
        return $token;
    }
    public function saveToken($token,$email){
        DB::table('password_resets')->insert([
            'email' =>$email,
            'token'=>$token,
            'created_at'=> Carbon::now()
        ]);
    }
    public function validateEmail($email){
        return !! User::whereEmail($email)->first();
    }
    public function failedReponse(){
        return response()->json([
            'error' => 'Email does found on our database'
        ],Response::HTTP_NOT_FOUND);
    }
    public function successReponse(){
        return response()->json([
            'success' => 'Reset Email is send successfully,please check your inbox.'
        ],Response::HTTP_OK);
    }
}
