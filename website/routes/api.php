<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\CartsController;
use App\Http\Controllers\api\OrdersController;
use App\Http\Controllers\api\ProductsController;
use App\Http\Controllers\api\UsersLoginController;
use App\Http\Controllers\api\NotificationsController;

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


Route::post('/login', [UsersLoginController::class, 'login']);
Route::post('/signUp', [UsersLoginController::class, 'signUp']);



Route::middleware('auth:user')->group(function () {
    Route::delete('/logout', [UsersLoginController::class, 'logout']);
    Route::get('/user', [UsersLoginController::class, 'user']);
    Route::get('/getCart', [CartsController::class, 'getCart']);
    Route::post('/addToCart', [CartsController::class, 'addToCart']);
    Route::post('/cartToOrdered', [CartsController::class, 'cartToOrdered']);
    
    Route::get('/myOrders', [OrdersController::class, 'index']);

    Route::get('/notifications', [NotificationsController::class, 'index']);

    
});
