<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\User;
use Auth;
use \Input;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserController extends Controller
{
    public $successStatus = 200;

    public function register(Request $request)
    {
        // $validator = Validator::make($request->all(), [
        //     'name' => 'required',
        //     'email' => 'required|email',
        //     'password' => 'required',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json(['error'=>$validator->errors()], 401);
        // }
        // $input = $request->all();

        //     $input['password'] = bcrypt($input['password']);
        //     $user = User::create($input);
        //     $success['token'] =  $user->createToken('MyApp')-> accessToken;
        //     $success['name'] =  $user->name;
        //     return response()->json(['success'=>$success], $this-> successStatus);
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);
        $credentials = request(['email', 'password']);
         // print_r($credentials);die;
        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ],401);
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        $id = Auth::user()->id;
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                 $tokenResult->token->expires_at
            )->toDateTimeString(),
            'identifier' => $id
        ]);
    }

//     if you do application's beforeModel, you have to be authenticated before you even load the app
// the login route's beforeModel should also check for the token, but if present and valid, redirect to the "dashboard"
// services lose their state when you refresh the app
// I generally save token in local storage
// checking if the login is expired is dependent on what you are using to login
// if it's JWT, it will tell you when it's expired, cause it has an embedded timestamp

    public function logout(Request $request) {
        // DB::select('UPDATE user_contacts SET is_active = false WHERE user_id = ?', [$identifier]);
        $request->user()->token()->revoke();
        return response()->json([
          'message' => 'Successfully logged out'
        ]);
    }

    public function logoutApi() { 
        if (Auth::check()) {
           Auth::user()->AauthAcessToken()->delete();
            return response()->json([
                'message' => 'Successfully logged out'
            ]);
        }
    }

    public function user(Request $request) {
        return response()->json($request->user());
    }

    public function makeUserOnline($identifier) {
      DB::select('UPDATE user_contacts SET is_active = true WHERE user_id = ?', [$identifier]);
      return response()->json(['success' => 'Successfully set user online.'], $this-> successStatus);
    }
}
