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

Route::get('/', function () {
    return view('iamawesome');
});

Route::get('/api/getPerson', function () {
    return view('welcome');
});



// API calls to our server
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

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
    \Cloudinary\Uploader::upload($url);
});
