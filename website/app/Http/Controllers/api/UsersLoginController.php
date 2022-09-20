<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Notifications\Admins\UserSignedUp;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Hash;

class UsersLoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    protected $request;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->middleware('auth:user')->except(['login', 'signUp']);
    }

    public function phone()
    {
        return 'phone';
    }

    protected function credentials(Request $request)
    {
        $data = $request->only($this->phone(), 'password');
        return $data;
    }

    protected function guard()
    {
        return Auth::guard('user');
    }

    protected function authenticated(Request $request, $user)
    {
        return $this->user($request);
    }

    /**
     * Validate the user login request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function validateLogin(Request $request)
    {
        $request->validate([
            $this->phone() => 'required|string',
            'password' => 'required|string',
        ]);
    }

    /**
     * Attempt to log the user into the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function attemptLogin(Request $request)
    {
        // dd($request);
        return $this->guard('user')->attempt(
            $this->credentials($request),
            $request->filled('remember')
        );
    }

    public function user(Request $request)
    {
        $user = $request->user('user');
        // $user->userable;
        return $user ?? null;
    }

    public function signUp(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'phone' => 'required|string',
            'password' => 'required|string',
        ]);
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        Notification::send(Admin::all(), new UserSignedUp($user));

        return 'user is sign up';
    }
}
