<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use \App\User;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/blah', function () {
    return view('iamawesome');
});

// API calls to our server
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

Route::get('/api/person/{personId}', function($personId) {
    $user = User::find($personId);
    return $user;
});

Route::post('/api/person', function(\Illuminate\Http\Request $request) {
    $personId = $request->input('personId');
    $name = $request->input('name');
    $user = new User;
    $user->name = $name;
    $user->personId = $personId;
    $user->numberOfVisits += 1;
    $user->save();
});

Route::get('/api/getCloudinaryData', function () {
    $time = time();
    $api_secret = 'AJoXAW5yAwGh1fYy8LVr7eooQ8A';
    return response()->json([
        'time' => $time,
        'api_secret' => $api_secret,
        'signature' => sha1('timestamp='+$time + $api_secret)
    ]);
});

Route::post('/api/sendImage', function(\Illuminate\Http\Request $request) {
    $url = $request->input('url');
    \Log::info($request);
    $res = \Cloudinary\Uploader::upload($url,[
        'api_key' => '925295814447944',
        'api_secret' => 'AJoXAW5yAwGh1fYy8LVr7eooQ8A',
        'cloud_name' => 'drauibq1c'
    ]);
    return response()->json([
        'url' => $res['secure_url']
    ]);
});
