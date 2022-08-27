<?php

namespace App\Http\Controllers\DashboardAPI;

use App\Filters\ClaimFilters;
use App\Models\Claim;
use App\Rules\Base64Rule;
use Illuminate\Http\Request;
use App\Models\OrderItem;
use App\Http\Controllers\Controller;
use App\Filters\OrderItemFilters;
use App\Models\Service;
use Illuminate\Validation\ValidationException;

class OrderItemsController extends Controller
{
    //
    public function create(Request $request)
    {
        // return $request->all();
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'user_id' => 'required|exists:users,id',
            'quantity' => 'required|numeric',
            'value' => 'required|numeric',
          
        ]);

        $orderItem = OrderItem::create($data);

        // return response(['success' => "orderItem {$orderItem->id} created"]);
        return __('CRUD.created', [
            'orderItem_id' => trans_choice('orderItem', 1),
            'id' => $orderItem->id
        ]);
    }

    public function update(Request $request, $id)
    {
        $orderItem = OrderItem::where('id', $id)->first();
        if (!$orderItem)
            throw ValidationException::withMessages(['id' => "there is no orderItem with id {$id}"]);

        $data = $request->validate([
            'product_id' => 'sometimes|exists:products,id',
            'user_id' => 'sometimes|exists:users,id',
            'quantity' => 'sometimes|numeric',
            'value' => 'sometimes|numeric',

        ]);

        $orderItem->update($data);

        return __('CRUD.updated', [
            'orderItem_id' => trans_choice('models.orderItem', 1),
            'id' => $orderItem->id
        ]);
    }

    public function index(OrderItemFilters $filters, Request $request)
    {

        return OrderItem::filter($filters)
            ->paginate($request->withoutPagination ? OrderItem::count() : $request->input('page_size') ?? 10)
            ->appends(request()->except('page'));
    }

    public function show(Request $request, $id)
    {
        return OrderItem::where('id', $id)->with($request->with ?? [])->first();
    }

    public function delete($id)
    {
        $orderItem = OrderItem::where('id', $id)->first();
        
        if (!$orderItem)
            throw ValidationException::withMessages(['id' => "you do not have orderItem with id {$id}"]);

        $orderItem->delete();

        return __('CRUD.deleted', [
            'orderItem_id' => trans_choice('models.orderItem', 1),
            'id' => $id
        ]);
    }

}
