<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\User;
use Auth;
use \Input;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public $successStatus = 200;

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $input = $request->all();

            $input['password'] = bcrypt($input['password']);
            $user = User::create($input);
            $success['token'] =  $user->createToken('MyApp')-> accessToken;
            $success['name'] =  $user->name;
            return response()->json(['success'=>$success], $this-> successStatus);
    }

    public function login(Request $request){
        $input = $request->all();
        // $test = Input('username');
        if(Auth::attempt(['email' => $input['username'], 'password' => $input['password']])){
            $user = Auth::user();
            $id = Auth::user()->id;
            $success['access_token'] =  $user->createToken('Password Token')-> accessToken;
            return response()->json(['success' => $success,'identifier' => $id], $this-> successStatus);
        }
        else{
            return response()->json(['error'=>'Unauthorised'], 401);
        }
    }

//     if you do application's beforeModel, you have to be authenticated before you even load the app
// the login route's beforeModel should also check for the token, but if present and valid, redirect to the "dashboard"
// services lose their state when you refresh the app
// I generally save token in local storage
// checking if the login is expired is dependent on what you are using to login
// if it's JWT, it will tell you when it's expired, cause it has an embedded timestamp

    public function logout($identifier) {
        DB::select('UPDATE user_contacts SET is_active = false WHERE user_id = ?', [$identifier]);
        Auth::logout();
        return response()->json(['success' => 'Successfully logged out.'], $this-> successStatus);
    }

    public function makeUserOnline($identifier) {
      DB::select('UPDATE user_contacts SET is_active = true WHERE user_id = ?', [$identifier]);
      return response()->json(['success' => 'Successfully set user online.'], $this-> successStatus);
    }
}
