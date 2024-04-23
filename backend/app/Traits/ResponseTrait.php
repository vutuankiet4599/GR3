<?php

namespace App\Traits;

/**
 * Quy ước form trả ra response
 */
trait ResponseTrait
{
    /**
     * Sử dụng khi process thành công
     * 
     * @param array $data Dữ liệu trả về ở dạng key - value
     * @param string $message Thông báo cho client, default = ""
     * @param int $status Mã response thông báo thành công
     * @return \Illuminate\Http\JsonResponse Dữ liệu sau khi được convert thành json sẵn sàng trả ra cho client
     */
    public function success($data = [], $message = '', $status = 200)
    {
        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => $message,
        ], $status);
    }

    /**
     * Sử dụng khi process thất bại
     * 
     * @param array $error Thông tin lỗi
     * @param string $message Thông báo cho client, default = ""
     * @param int $status Mã response thông báo thất bại
     * @return \Illuminate\Http\JsonResponse Dữ liệu sau khi được convert thành json sẵn sàng trả ra cho client
     */
    public function failure($error = [], $message = '', $status, $code = 422)
    {
        return response()->json([
            'success' => false,
            'error' => $error,
            'message' => $message,
            'status' => $status,
        ], $code);
    }
}
