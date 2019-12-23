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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', 'api\UserController@register');
Route::post('login', 'api\UserController@login');
Route::post('logout', 'api\UserController@logout');

Route::get('contact/{id}', 'api\ContactController@show');
Route::get('channel/{id}', 'api\ChannelController@show');

Route::get('selectedUserChats', 'api\MessageController@get');
Route::post('postMessage', 'api\MessageController@post');

Route::get('/Websocket', 'WebSockets@getInfo');