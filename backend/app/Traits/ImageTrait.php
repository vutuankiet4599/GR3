<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait ImageTrait
{
    public function uploadImageToStorage($file, $foderName)
    {
        $filePath = Storage::disk('local')->put('public/'.$foderName, $file);
        $dataUpload = [
            'link' => env("APP_URL", 'http://localhost:8000') . Storage::url($filePath),
        ];

        return $dataUpload;
    }
}
