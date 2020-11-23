<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\User;
use Illuminate\Support\Facades\Auth;
use \Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;
use App\Events\SomeTestEvent;
use Carbon\Carbon;

class MessageController extends Controller
{
    public function get(Request $request){
    	$filter = $request->get('filter');
    	$allContacts = DB::select('select M.id,M.recipient_id,M.message,M.date_created AS message_date,C.profile_image FROM user_messages M INNER JOIN user_contacts C ON M.recipient_id = C.user_id WHERE M.recipient_id IN (?,?)', [$filter['selectedUserId'],$filter['activeUserId']]);

      return $allContacts;
    }

    public function post(Request $request){
    	$message = $request->get('message');
    	$recipient_id = $request->get('recipient_id');
    	$user_id = $request->get('user_id');
        $current_user_image = $request->get('current_user_image');

        $currentTime = Carbon::now()->format('Y-m-d H:i:s.u');
        broadcast(new \App\Events\SomeTestEvent($message, $currentTime, $current_user_image))->toOthers();
    	$postMessage = DB::insert('INSERT INTO user_messages(recipient_id,message,user_id,date_created) VALUES (?,?,?,?)', [$recipient_id,$message,$user_id,$currentTime]);
    	$id = DB::getPdo()->lastInsertId();
        return response()->json(["id" => $id, "time" => $currentTime]);
    	
    }

    public function postMessage(Request $request){

    }
}
