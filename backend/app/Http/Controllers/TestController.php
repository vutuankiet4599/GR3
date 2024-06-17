<?php

namespace App\Http\Controllers;

use App\Events\TestEvent;
use App\Jobs\SendEmail;
use App\Mail\MailNotify;
use App\Models\User;
use App\Services\FirebaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Mail;

class TestController extends Controller
{
    protected $fs;

    public function __construct(FirebaseService $fs)
    {
        $this->fs = $fs;    
    }

    public function test(Request $request)
    {
        // $rs = $this->fs->uploadImage($request->file('image'));
        // if (!$rs) {
        //     return response()->json([], 400);
        // }
        // return response()->json(['data' => $rs]);
        try {
            // Mail::to('vutuankiet4599@gmail.com')->send(new MailNotify(['url' => 'https://www.google.com/']));
            $data = ['url' => 'https://www.google.com'];
            $usersArray = [['email' => 'vutuankiet4599@gmail.com']];
            $users = array_map(function($user) {
                return (object) $user;
            }, $usersArray);
            // $users = User::all();
            SendEmail::dispatch($data, $users)->afterCommit();
            // return response()->json(['success' => true]);
            // event(new TestEvent(['message' => 'Test Success']));
            return response()->json(['success' => true]);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
        }
    }
}
