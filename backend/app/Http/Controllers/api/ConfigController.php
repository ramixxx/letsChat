<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\User;
use Illuminate\Support\Facades\Auth;
use \Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;

class ConfigController extends Controller
{
    public function show($id){
    	$current_user_config = DB::select('SELECT name,value FROM config WHERE user_id = ?', [$id]);


       	return response()->json($current_user_config, 200);
    }
}
