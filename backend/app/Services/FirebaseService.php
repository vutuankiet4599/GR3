<?php

namespace App\Services;

use Kreait\Firebase\Contract\Storage;

/**
 * Serice dùng để truy cập vào firebase,
 * sử dụng bằng cách inject vào controller
 */
class FirebaseService {
    protected $storage;

    public function __construct(Storage $storage)
    {
        $this->storage = $storage;
    }

    /**
     * Upload file lên firebase. 
     * 
     * Nếu upload thành công thì sẽ trả về link ảnh để truy cập.
     * 
     * Nếu thất bại thì trả về string rỗng
     * 
     * @param object $image File ảnh để upload
     * @param string $folder Folder để đặt ảnh default = ""
     * @return string
     */
    public function uploadImage($image, $folder = '')
    {
        $localfolder = public_path('firebase-temp-uploads') . '/';
        $file = $image->getFileName() . '.' . $image->getClientOriginalExtension();
        
        if ($image->move($localfolder, $file)) {
            $uploadedfile = fopen($localfolder.$file, 'r');
            $object = $this->storage->getBucket()->upload($uploadedfile, ['name' => $folder . '/' . $file]);
            unlink($localfolder . $file);
            $url = $object->signedUrl(now()->addCenturies(10));
            return $url;
        } else {
            return '';
        }

    }
}