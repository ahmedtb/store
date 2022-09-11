<?php

namespace App\Http\Controllers\api;

use App\Filters\ClaimFilters;
use App\Models\Claim;
use App\Rules\Base64Rule;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Controllers\Controller;
use App\Filters\CategoryFilters;
use App\Models\Service;
use Illuminate\Validation\ValidationException;

class CategoriesController extends Controller
{

    public function categories(CategoryFilters $filters, Request $request)
    {

        return Category::all();
    }



}
