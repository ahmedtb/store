<?php

namespace App\Http\Controllers\DashboardAPI;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Filters\OrderFilters;
use App\Http\Controllers\Controller;
use App\Notifications\Users\OrderAccepted;
use Illuminate\Validation\ValidationException;
use App\Filters\ActivityLogFilters;
use App\Models\ActivityLog;

class OrdersController extends Controller
{
    //
    public function create(Request $request)
    {
        // return $request->all();
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',

        ]);

        $order = Order::create($data);

        // return response(['success' => "order {$order->id} created"]);
        return __('CRUD.created', [
            'user_id' => trans_choice('order', 1),
            'id' => $order->id
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = Order::where('id', $id)->first();
        if (!$user)
            throw ValidationException::withMessages(['id' => "there is no user with id {$id}"]);

        $data = $request->validate([
            'user_id' => 'sometimes|exists:users,id',

        ]);

        $user->update($data);

        return __('CRUD.updated', [
            'user_id' => trans_choice('models.user', 1),
            'id' => $user->id
        ]);
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
            throw ValidationException::withMessages(['id' => "there is no order with id {$id}"]);

        $order->delete();

        return __('CRUD.deleted', [
            'user_id' => trans_choice('models.order', 1),
            'id' => $id
        ]);
    }

    public function accept($id)
    {
        $order = Order::where('id', $id)->first();
        if (!$order)
            throw ValidationException::withMessages(['id' => "there is no order with id {$id}"]);
        if ($order->status != 'ordered')
            throw ValidationException::withMessages(['id' => "this is not ordered order {$id}"]);
        $order->status = 'accepted';
        $order->save();

        $order->user->notify(new OrderAccepted($order));

        return 'order ' . $id . ' is accepted';
    }
    public function reject($id)
    {
        $order = Order::where('id', $id)->first();
        if (!$order)
            throw ValidationException::withMessages(['id' => "there is no order with id {$id}"]);
        if ($order->status != 'ordered')
            throw ValidationException::withMessages(['id' => "this is not ordered order {$id}"]);
        $order->status = 'rejected';
        $order->save();
        return 'order ' . $id . ' is rejected';
    }
    public function pay($id)
    {
        $order = Order::where('id', $id)->first();
        if (!$order)
            throw ValidationException::withMessages(['id' => "there is no order with id {$id}"]);
        if ($order->status != 'accepted')
            throw ValidationException::withMessages(['id' => "this is not accepted order {$id}"]);
        $order->status = 'paid';
        $order->save();
        return 'order ' . $id . ' is paid';
    }

    public function ordersOperationsStatistics(Request $request, ActivityLogFilters $filters)
    {
        // return $request->all();
        return [
            'orderCreatedActivities' => ActivityLog::filter($filters)->orderCreatedActivities()->count(),
            'orderOrderedActivities' => ActivityLog::filter($filters)->orderOrderedActivities()->count(),
            'orderPaidActivities' => ActivityLog::filter($filters)->orderPaidActivities()->count(),
            'orderAcceptedActivities' => ActivityLog::filter($filters)->orderAcceptedActivities()->count(),
            'orderRejectedActivities' => ActivityLog::filter($filters)->orderRejectedActivities()->count(),
        ];
    }
}
