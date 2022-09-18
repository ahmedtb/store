<?php

namespace App\Http\Controllers\api;

use App\Filters\ClaimFilters;
use App\Models\Claim;
use App\Rules\Base64Rule;
use Illuminate\Http\Request;
use App\Models\Notification;
use App\Http\Controllers\Controller;
use App\Filters\NotificationFilters;
use App\Models\Service;
use Illuminate\Validation\ValidationException;

class NotificationsController extends Controller
{
   
    public function index(NotificationFilters $filters, Request $request)
    {

        return $request->user()->notifications()->latest()->filter($filters)
            ->paginate($request->input('page_size') ?? 10)
            ->appends(request()->except('page'));
    }

    public function show(Request $request, $id)
    {
        return $request->user()->notifications()->where('id', $id)->with($request->with ?? [])->first();
    }

    
    public function markAsReaded(Request $request, $id)
    {
        $notification = $request->user()->notifications()->where('id', $id)->first();
        $notification->markAsRead();
    }
   
}
