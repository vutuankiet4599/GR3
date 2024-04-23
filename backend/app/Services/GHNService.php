<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

/**
 * Service dùng để truy cập đến api của giao hàng nhanh để quản lý vận chuyển đơn hàng
 */
class GHNService {
    /**
     * @var string $apiInstance API instance để kết nối đến GHN, có sẵn headers và base url
     */
    private $apiInstance;

    public function __construct()
    {
        $url = env('GHN_URL', 'https://dev-online-gateway.ghn.vn/');
        $token = env('GHN_TOKEN', 'token');
        $shopId = env('GHN_SHOP_ID', 'shopId');
        $contentType = 'application/json';
        $headers = [
            'Content-Type' => $contentType,
            'Token' => $token,
            'ShopId' => $shopId,
        ];

        $this->apiInstance = Http::baseUrl($url)->withHeaders($headers);
    }

    /**
     * Lấy dữ liệu tỉnh thành phố mà giao hàng nhanh cung cấp
     * 
     * @return array
     */
    public function getProvinces()
    {

    }

    /**
     * Lấy dữ liệu quận huyện theo id của thành phố mà ghn cung cấp
     * 
     * @param int $provinceId Id của thành phố nơi mà bạn muốn tìm quận huyện
     * @return array
     */
    public function getDistricts($provinceId)
    {

    }

    /**
     * Lấy dữ liệu phường xã theo id của quận huyện mà ghn cung cấp
     * 
     * @param int $districtId Id của quận huyện nơi mà bạn muốn tìm phường xã
     * @return array
     */
    public function getWards($districtId)
    {

    }
}