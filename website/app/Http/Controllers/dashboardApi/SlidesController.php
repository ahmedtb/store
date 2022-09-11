<?php

namespace App\Http\Controllers\DashboardAPI;

use App\Filters\ClaimFilters;
use App\Models\Claim;
use App\Rules\Base64Rule;
use Illuminate\Http\Request;
use App\Models\Slide;
use App\Http\Controllers\Controller;
use App\Filters\SlideFilters;
use App\Models\Service;
use Illuminate\Validation\ValidationException;

class SlidesController extends Controller
{
    //
    public function create(Request $request)
    {
        // return $request->all();
        $data = $request->validate([
            'image' => 'required|string',
            'to' => 'required|string',
          
        ]);
        if (!$data['image'])
            $data['image'] = Slide::defaultImage();

        $slide = Slide::create($data);

        // return response(['success' => "slide {$slide->id} created"]);
        return __('CRUD.created', [
            'name' => trans_choice('slide', 1),
            'id' => $slide->id
        ]);
    }

    public function update(Request $request, $id)
    {
        $slide = Slide::where('id', $id)->first();
        if (!$slide)
            throw ValidationException::withMessages(['id' => "there is no slide with id {$id}"]);

        $data = $request->validate([
            'image' => 'sometimes|string',
            'to' => 'sometimes|string',

        ]);

        $slide->update($data);

        return __('CRUD.updated', [
            'name' => trans_choice('models.slide', 1),
            'id' => $slide->id
        ]);
    }

    public function index(SlideFilters $filters, Request $request)
    {

        return Slide::filter($filters)
            ->paginate($request->input('page_size') ?? 10)
            ->appends(request()->except('page'));
    }

    public function show(Request $request, $id)
    {
        return Slide::where('id', $id)->with($request->with ?? [])->first();
    }

    public function delete($id)
    {
        $slide = Slide::where('id', $id)->first();
        
        if (!$slide)
            throw ValidationException::withMessages(['id' => "you do not have service slide with id {$id}"]);

        $slide->delete();

        return __('CRUD.deleted', [
            'name' => trans_choice('models.slide', 1),
            'id' => $id
        ]);
    }


    public function image($id)
    {
        $slide =  Slide::find($id);
        if (!$slide)
            throw ValidationException::withMessages(['id' => 'no such slide ' . $id . ' exists']);
        return $slide->image();
    }
}
