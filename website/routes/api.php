<?php

use App\Http\Controllers\api\CartsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\ProductsController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/productsIndex', [ProductsController::class, 'index']);
Route::get('/productShow/{id}', [ProductsController::class, 'show']);
Route::get('/productImage/{id}', [ProductsController::class, 'image']);

Route::post('/addToCart', [CartsController::class, 'addToCart']);
