<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
	Auth::routes();
	Route::post('register', 'api\UserController@register');
	Route::post('login', 'api\UserController@login');
	Route::post('makeUserOnline/{identifier}', 'api\UserController@makeUserOnline');

	Route::get('contact/{id}', 'api\ContactController@show');
	Route::get('channel/{id}', 'api\ChannelController@show');
	Route::get('config/{id}', 'api\ConfigController@show');

	Route::get('selectedUserChats', 'api\MessageController@get');
	Route::post('postMessage', 'api\MessageController@post');


Route::group([
     'prefix' => 'auth'
], function () {

	Route::group([
         'middleware' => 'auth:api'
       ], function() {

           Route::get('logout', 'api\UserController@logoutApi');
           Route::get('user', 'api\UserController@user');
    });
});


Route::get('test-broadcast', function(){

});

