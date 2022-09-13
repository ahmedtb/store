<?php

namespace App\Http\Controllers\api;

use App\Models\Admin;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Filters\OrderFilters;
use App\Http\Controllers\Controller;
use App\Notifications\UserOrderedCart;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\ValidationException;

class CartsController extends Controller
{

    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric'
        ]);

        $newOrder = $request->user()->cart();
        // return;
        if (!$newOrder)
            $newOrder = $request->user()->orders()->create([
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

        $newOrder = $request->user()->cart();
        if (!$newOrder)
            throw ValidationException::withMessages(['id' => "you do not have new order"]);


        $orderItem = $newOrder->removeFromOrder($request->order_item_id);

        return 'order item ' . $orderItem->id . ' is removed from the cart';
    }


    public function delete(Request $request, $id)
    {
        $order = $request->user()->orders()->where('id', $id)->first();



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


    public function getCart(Request $request)
    {
        return $request->user()->cart();
    }

    public function cartToOrdered(Request $request)
    {
        $request->validate([
            'long' => 'required|numeric',
            'lat' => 'required|numeric',
        ]);
        $cart = $request->user()->cart();
        foreach ($cart->orderItems as $item) {
        }
        $cart->status = 'ordered';
        $cart->GPS = ['lat' => $request->lat, 'long' => $request->long];
        $cart->save();
        Notification::send(Admin::all(), new UserOrderedCart($cart));
        return 'cart ' . $cart->id . ' is ordered';
    }
}
