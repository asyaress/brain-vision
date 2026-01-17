<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrainVlmController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| UI-only starter page for BrainVLM.
*/

Route::get('/', fn () => redirect()->route('brainvlm'));

Route::get('/brainvlm', [BrainVlmController::class, 'index'])->name('brainvlm');
