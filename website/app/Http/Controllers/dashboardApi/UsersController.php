<?php

namespace App\Http\Controllers\DashboardAPI;

use App\Filters\ClaimFilters;
use App\Models\Claim;
use App\Rules\Base64Rule;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Filters\UserFilters;
use App\Models\Service;
use Illuminate\Validation\ValidationException;

class UsersController extends Controller
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

        $user = User::create($data);

        // return response(['success' => "user {$user->id} created"]);
        return __('CRUD.created', [
            'user_id' => trans_choice('user', 1),
            'id' => $user->id
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::where('id', $id)->first();
        if (!$user)
            throw ValidationException::withMessages(['id' => "there is no user with id {$id}"]);

        $data = $request->validate([
            'name' => 'sometimes|string',
            'username' => 'sometimes|string',
            'password' => 'sometimes|string',
          
        ]);

        $user->update($data);

        return __('CRUD.updated', [
            'user_id' => trans_choice('models.user', 1),
            'id' => $user->id
        ]);
    }

    public function index(UserFilters $filters, Request $request)
    {

        return User::filter($filters)
            ->paginate($request->withoutPagination ? User::count() : $request->input('page_size') ?? 10)
            ->appends(request()->except('page'));
    }

    public function show(Request $request, $id)
    {
        return User::where('id', $id)->with($request->with ?? [])->first();
    }

    public function delete($id)
    {
        $user = User::where('id', $id)->first();
        
        if (!$user)
            throw ValidationException::withMessages(['id' => "you do not have user with id {$id}"]);

        $user->delete();

        return __('CRUD.deleted', [
            'user_id' => trans_choice('models.user', 1),
            'id' => $id
        ]);
    }

}
