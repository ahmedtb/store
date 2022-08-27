<?php

namespace App\Http\Controllers\DashboardAPI;

use App\Filters\ClaimFilters;
use App\Models\Claim;
use App\Rules\Base64Rule;
use Illuminate\Http\Request;
use App\Models\Brand;
use App\Http\Controllers\Controller;
use App\Filters\BrandFilters;
use App\Models\Service;
use Illuminate\Validation\ValidationException;

class BrandsController extends Controller
{
    //
    public function create(Request $request)
    {
        // return $request->all();
        $data = $request->validate([
            'name' => 'required|string',
            'image' => 'sometimes|nullable|string',
          
        ]);
        if (!$data['image'])
            $data['image'] = Brand::defaultImage();

        $brand = Brand::create($data);

        // return response(['success' => "brand {$brand->id} created"]);
        return __('CRUD.created', [
            'name' => trans_choice('brand', 1),
            'id' => $brand->id
        ]);
    }

    public function update(Request $request, $id)
    {
        $brand = Brand::where('id', $id)->first();
        if (!$brand)
            throw ValidationException::withMessages(['id' => "there is no brand with id {$id}"]);

        $data = $request->validate([
            'name' => 'sometimes|string',
            'image' => 'sometimes|string',

        ]);

        $brand->update($data);

        return __('CRUD.updated', [
            'name' => trans_choice('models.brand', 1),
            'id' => $brand->id
        ]);
    }

    public function index(BrandFilters $filters, Request $request)
    {

        return Brand::filter($filters)
            ->paginate($request->withoutPagination ? Brand::count() : $request->input('page_size') ?? 10)
            ->appends(request()->except('page'));
    }

    public function show(Request $request, $id)
    {
        return Brand::where('id', $id)->with($request->with ?? [])->first();
    }

    public function delete($id)
    {
        $brand = Brand::where('id', $id)->first();
        
        if (!$brand)
            throw ValidationException::withMessages(['id' => "you do not have brand with id {$id}"]);

        $brand->delete();

        return __('CRUD.deleted', [
            'name' => trans_choice('models.brand', 1),
            'id' => $id
        ]);
    }


    public function image($id)
    {
        $brand =  Brand::find($id);
        if (!$brand)
            throw ValidationException::withMessages(['id' => 'no such brand ' . $id . ' exists']);
        return $brand->image();
    }
}
