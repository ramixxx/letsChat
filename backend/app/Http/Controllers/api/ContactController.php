<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\User;
use Illuminate\Support\Facades\Auth;
use \Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;

class ContactController extends Controller
{
    public function show($id){
    	$allContacts = DB::select('select id,name,is_active,surname,user_id from user_contacts where user_id != ?', [$id]);

       	return response()->json($allContacts, 200);
    }
}
