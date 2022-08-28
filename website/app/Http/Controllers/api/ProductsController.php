<?php

namespace App\Http\Controllers\api;

use App\Filters\ClaimFilters;
use App\Models\Claim;
use App\Rules\Base64Rule;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Filters\ProductFilters;
use App\Models\Service;
use Illuminate\Validation\ValidationException;

class ProductsController extends Controller
{
   
    public function index(ProductFilters $filters, Request $request)
    {

        return Product::filter($filters)
            ->paginate($request->withoutPagination ? Product::count() : $request->input('page_size') ?? 10)
            ->appends(request()->except('page'));
    }

    public function show(Request $request, $id)
    {
        return Product::where('id', $id)->with($request->with ?? [])->first();
    }



    public function image($id)
    {
        $product =  Product::find($id);
        if (!$product)
            throw ValidationException::withMessages(['id' => 'no such product ' . $id . ' exists']);
        return $product->image();
    }
}
