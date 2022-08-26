<?php

use App\Http\Controllers\DashboardAPI\CategoriesController;
use App\Http\Controllers\DashboardAPI\ProductsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::get('/categoryImage/{id}', [CategoriesController::class, 'image']);
Route::put('/categoryEdit/{id}', [CategoriesController::class, 'update']);