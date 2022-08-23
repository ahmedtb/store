<?php

use Illuminate\Support\Facades\Route;

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
Route::view('/dashboard/{path}', 'dashboard')->where('path', '([A-z\d\-\/_.]+)?');
Route::view('dashboard', 'dashboard');

Route::view('/{path}', 'store')->where('path', '([A-z\d\-\/_.]+)?');
Route::view('', 'store');


Route::get('currentLanguage', function () {
    return session()->get('locale') ?? app()->getLocale();
});
