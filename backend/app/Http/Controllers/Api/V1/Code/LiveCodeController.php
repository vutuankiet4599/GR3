<?php

namespace App\Http\Controllers\Api\V1\Code;

use App\Events\CompanySendCodeToDevEvent;
use App\Events\DevSendCodeToCompanyEvent;
use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Repositories\Room\RoomRepository;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class LiveCodeController extends Controller
{
    use ResponseTrait;

    protected $repository;

    public function __construct(RoomRepository $repository) {
        $this->repository = $repository;
    }

    public function createRoom(Request $request)
    {
        try {
            $companyId = $request->user('companies')->id;
            $code = uniqid();
            $body = "";
            $response = $this->repository->create([
                'code' => $code,
                'company_id' => $companyId,
                'body' => $body
            ]);
            if (!$response) {
                return $this->failure([], 'Cannot create room', "");
            }
            return $this->success(['code' => $code]);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function companyRoom(Request $request)
    {
        try {
            $companyId = $request->user('companies')->id;
            $rooms = Room::where('company_id', $companyId)->get();
            return $this->success($rooms);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function getRoom(Request $request, $code)
    {
        try {
            $room = Room::where('code', $code)->first();
            return $this->success($room);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function liveCode(Request $request)
    {
        try {
            $user = $request->user('users');
            $company = $request->user('companies');
            $body = $request->input('body', '');
            $code = $request->input('code', '');
            $room = Room::where('code', $code)->first();

            $room->body = $body;
            $room->save();

            if (!empty($user)) {
                event(new DevSendCodeToCompanyEvent($code, ['body' => $body]));
            }

            if (!empty($company)) {
                event(new CompanySendCodeToDevEvent($code, ['body' => $body]));
            }

            return $this->success([$room, $code, $body]);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }
}
