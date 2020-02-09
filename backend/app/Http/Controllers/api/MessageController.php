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

class MessageController extends Controller
{
    public function get(Request $request){
    	$filter = $request->get('filter');
    	$allContacts = DB::select('select M.id,M.recipient_id,M.message,C.profile_image FROM user_messages M INNER JOIN user_contacts C ON M.recipient_id = C.user_id WHERE M.recipient_id IN (?,?)', [$filter['selectedUserId'],$filter['activeUserId']]);

      return $allContacts;
    }

    public function post(Request $request){
    	$message = $request->get('message');
    	$recipient_id = $request->get('recipient_id');
    	$user_id = $request->get('user_id');

      broadcast(new \App\Events\SomeTestEvent($message))->toOthers();

    	$postMessage = DB::insert('INSERT INTO user_messages(recipient_id,message,user_id) VALUES (?,?,?)', [$recipient_id,$message,$user_id]);
    	$id = DB::getPdo()->lastInsertId();
    	return $id;
    }

    public function postMessage(Request $request){

    }
}
