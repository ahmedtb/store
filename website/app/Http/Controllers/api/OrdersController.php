<?php

namespace App\Http\Controllers\api;

use App\Filters\ClaimFilters;
use App\Models\Claim;
use App\Rules\Base64Rule;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Http\Controllers\Controller;
use App\Filters\OrderFilters;
use App\Models\Service;
use Illuminate\Validation\ValidationException;

class OrdersController extends Controller
{
   
    public function index(OrderFilters $filters, Request $request)
    {

        return $request->user()->orders()->latest()->filter($filters)
            ->paginate($request->input('page_size') ?? 10)
            ->appends(request()->except('page'));
    }

    public function show(Request $request, $id)
    {
        return $request->user()->orders()->where('id', $id)->with($request->with ?? [])->first();
    }

   
}
