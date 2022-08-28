<?php

namespace App\Http\Controllers\api;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Filters\OrderFilters;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class CartsController extends Controller
{

    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric'
        ]);

        $newOrder = Order::where('status', 'new')->first();
        if (!$newOrder)
            $newOrder = Order::create([
                'user_id' => $request->user()->id,
                'status' => 'new'
            ]);
        $product = Product::find($request->product_id);
        $orderItem = $newOrder->addToOrder($product, $request->quantity);

        return 'order item ' . $orderItem->id . ' is added to the cart';
    }

    public function removeFromCart(Request $request)
    {
        $request->validate([
            'order_item_id' => 'required|exists:order_items,id',
        ]);

        $newOrder = Order::where('status', 'new')->first();
        if (!$newOrder)
            throw ValidationException::withMessages(['id' => "you do not have new order"]);


        $orderItem = $newOrder->removeFromOrder($request->order_item_id);

        return 'order item ' . $orderItem->id . ' is removed from the cart';
    }


    public function index(OrderFilters $filters, Request $request)
    {
        return Order::filter($filters)
            ->paginate($request->withoutPagination ? Order::count() : $request->input('page_size') ?? 10)
            ->appends(request()->except('page'));
    }

    public function show(Request $request, $id)
    {
        return Order::where('id', $id)->with($request->with ?? [])->first();
    }

    public function delete($id)
    {
        $order = Order::where('id', $id)->first();



        if (!$order)
            throw ValidationException::withMessages(['id' => "you do not have order with id {$id}"]);

        if ($order->status != 'new')
            throw ValidationException::withMessages(['id' => "you can not delete this recorded order"]);

        $order->delete();

        return __('CRUD.deleted', [
            'order_id' => trans_choice('models.order', 1),
            'id' => $id
        ]);
    }
}
