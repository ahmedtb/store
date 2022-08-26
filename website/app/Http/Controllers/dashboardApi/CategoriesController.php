<?php

namespace App\Http\Controllers\DashboardAPI;

use App\Filters\ClaimFilters;
use App\Models\Claim;
use App\Rules\Base64Rule;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Controllers\Controller;
use App\Filters\CategoryFilters;
use App\Models\Service;
use Illuminate\Validation\ValidationException;

class CategoriesController extends Controller
{
    //
    public function create(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'parent_id' => 'required|exists:categories,id',
        ]);

        $category = Category::create($data);

        return __('CRUD.created', [
            'name' => trans_choice('category', 1),
            'id' => $category->id
        ]);
    }

    public function update(Request $request, $id)
    {
        $category = Category::where('id', $id)->first();
        if (!$category)
            throw ValidationException::withMessages(['id' => "there is no category with id {$id}"]);

        $data = $request->validate([
            'name' => 'sometimes|string',
            'parent_id' => 'sometimes|exists:categories,id',
        ]);

        $category->update($data);

        return __('CRUD.updated', [
            'name' => trans_choice('models.category', 1),
            'id' => $category->id
        ]);
    }

    public function index(CategoryFilters $filters, Request $request)
    {

        return Category::filter($filters)
            ->paginate($request->withoutPagination ? Category::count() : $request->input('page_size') ?? 10)
            ->appends(request()->except('page'));
    }

    public function show(Request $request, $id)
    {
        return Category::where('id', $id)->with($request->with ?? [])->first();
    }

    public function delete($id)
    {
        $category = Category::where('id', $id)->first();
        
        if (!$category)
            throw ValidationException::withMessages(['id' => "you do not have service category with id {$id}"]);

        $category->delete();

        return __('CRUD.deleted', [
            'name' => trans_choice('models.category', 1),
            'id' => $id
        ]);
    }


    public function image($id)
    {
        $category =  Category::find($id);
        if (!$category)
            throw ValidationException::withMessages(['id' => 'no such category ' . $id . ' exists']);
        return $category->image();
    }
}
