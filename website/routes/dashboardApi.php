<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardAPI\BrandsController;
use App\Http\Controllers\DashboardAPI\OrdersController;
use App\Http\Controllers\DashboardAPI\ProductsController;
use App\Http\Controllers\DashboardAPI\CategoriesController;
use App\Http\Controllers\DashboardAPI\OrderItemsController;

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
Route::delete('/productDelete/{id}', [ProductsController::class, 'delete']);
Route::get('/productImage/{id}', [ProductsController::class, 'image']);
Route::put('/productEdit/{id}', [ProductsController::class, 'update']);
Route::post('/productCreate', [ProductsController::class, 'create']);

Route::get('/categoriesIndex', [CategoriesController::class, 'index']);
Route::get('/categoryShow/{id}', [CategoriesController::class, 'show']);
Route::delete('/categoryDelete/{id}', [CategoriesController::class, 'delete']);
Route::put('/categoryEdit/{id}', [CategoriesController::class, 'update']);
Route::post('/categoryCreate', [CategoriesController::class, 'create']);

Route::get('/brandsIndex', [BrandsController::class, 'index']);
Route::get('/brandShow/{id}', [BrandsController::class, 'show']);
Route::delete('/brandDelete/{id}', [BrandsController::class, 'delete']);
Route::get('/brandImage/{id}', [BrandsController::class, 'image']);
Route::put('/brandEdit/{id}', [BrandsController::class, 'update']);
Route::post('/brandCreate', [BrandsController::class, 'create']);

Route::get('/ordersIndex', [OrdersController::class, 'index']);
Route::get('/orderShow/{id}', [OrdersController::class, 'show']);
Route::delete('/orderDelete/{id}', [OrdersController::class, 'delete']);
Route::put('/orderEdit/{id}', [OrdersController::class, 'update']);
Route::post('/orderCreate', [OrdersController::class, 'create']);


Route::get('/orderItemsIndex', [OrderItemsController::class, 'index']);
Route::get('/orderItemShow/{id}', [OrderItemsController::class, 'show']);
Route::delete('/orderItemDelete/{id}', [OrderItemsController::class, 'delete']);
Route::put('/orderItemEdit/{id}', [OrderItemsController::class, 'update']);
Route::post('/orderItemCreate', [OrderItemsController::class, 'create']);