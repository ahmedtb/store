<?php

namespace App\Http\Controllers\DashboardAPI;

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
    //
    public function create(Request $request)
    {
        // return $request->all();
        $data = $request->validate([
            'name' => 'required|string',
            'type' => 'required|string',
          
        ]);
        if (!$data['image'])
            $data['image'] = Product::defaultImage();

        $product = Product::create($data);

        // return response(['success' => "product {$product->id} created"]);
        return __('CRUD.created', [
            'name' => trans_choice('service_provider', 1),
            'id' => $product->id
        ]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::where('id', $id)->first();
        if (!$product)
            throw ValidationException::withMessages(['id' => "there is no product with id {$id}"]);

        $data = $request->validate([
            'name' => 'sometimes|string',
            'type' => 'sometimes|string',
        ]);

        $product->update($data);

        return __('CRUD.updated', [
            'name' => trans_choice('models.service_provider', 1),
            'id' => $product->id
        ]);
    }

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

    public function delete($id)
    {
        $product = Product::where('id', $id)->first();
        
        if (!$product)
            throw ValidationException::withMessages(['id' => "you do not have service provider with id {$id}"]);

        if ($product->claims()->count() > 0)
            throw ValidationException::withMessages(['id' => "you can not delete this service provider: {$id}, it has " . $product->claims()->count() . " claim linked to it"]);

        $product->documents()->delete();
        $product->comments()->delete();
        $product->delete();

        return __('CRUD.deleted', [
            'name' => trans_choice('models.service_provider', 1),
            'id' => $id
        ]);
    }

    public function providerTopServices($id)
    {
        $product = Product::where('id', $id)->first();
        return [
            'topUsed' => $product->topUsedServices()->get(),
            'topBillsTotalValue' => $product->topBillsTotalValueServices()->get(),
        ];
    }


    public function image($id)
    {
        $provider =  Product::find($id);
        if (!$provider)
            throw ValidationException::withMessages(['id' => 'no such provider ' . $id . ' exists']);
        return $provider->image();
    }
}
