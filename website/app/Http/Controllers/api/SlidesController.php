<?php

namespace App\Http\Controllers\api;

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
  

    public function slides(SlideFilters $filters, Request $request)
    {

        return Slide::all();
    }


}
