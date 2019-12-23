<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\User;
use Illuminate\Support\Facades\Auth;
use \Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;

class ChannelController extends Controller
{
    public function show($id){ 
    	$allChannels = DB::select('select channel_name from user_channels where user_id = ?', [$id]);


       	return response()->json($allChannels, 200); 
    }
}
