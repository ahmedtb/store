<?php

namespace App\Http\Controllers\DashboardAPI;

use App\Filters\ClaimFilters;
use App\Models\Claim;
use App\Rules\Base64Rule;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Http\Controllers\Controller;
use App\Filters\AdminFilters;
use App\Models\Service;
use Illuminate\Validation\ValidationException;

class AdminsController extends Controller
{
    //
    public function create(Request $request)
    {
        // return $request->all();
        $data = $request->validate([
            'name' => 'required|string',
            'username' => 'required|string',
            'password' => 'required|string',
          
        ]);

        $admin = Admin::create($data);

        // return response(['success' => "admin {$admin->id} created"]);
        return __('CRUD.created', [
            'admin_id' => trans_choice('admin', 1),
            'id' => $admin->id
        ]);
    }

    public function update(Request $request, $id)
    {
        $admin = Admin::where('id', $id)->first();
        if (!$admin)
            throw ValidationException::withMessages(['id' => "there is no admin with id {$id}"]);

        $data = $request->validate([
            'name' => 'sometimes|string',
            'username' => 'sometimes|string',
            'password' => 'sometimes|string',
          
        ]);

        $admin->update($data);

        return __('CRUD.updated', [
            'admin_id' => trans_choice('models.admin', 1),
            'id' => $admin->id
        ]);
    }

    public function index(AdminFilters $filters, Request $request)
    {

        return Admin::filter($filters)
            ->paginate($request->withoutPagination ? Admin::count() : $request->input('page_size') ?? 10)
            ->appends(request()->except('page'));
    }

    public function show(Request $request, $id)
    {
        return Admin::where('id', $id)->with($request->with ?? [])->first();
    }

    public function delete($id)
    {
        $admin = Admin::where('id', $id)->first();
        
        if (!$admin)
            throw ValidationException::withMessages(['id' => "you do not have admin with id {$id}"]);

        $admin->delete();

        return __('CRUD.deleted', [
            'admin_id' => trans_choice('models.admin', 1),
            'id' => $id
        ]);
    }

}
