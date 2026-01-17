<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BrainVlmController extends Controller
{
    public function index(Request $request)
    {
        return view('brainvlm.index');
    }
}
