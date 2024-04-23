<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'password' => 'required|string|min:6|confirmed',
            'name' => 'required|string|min:6',
            'description' => 'nullable|string|min:6',
            'address' => 'nullable|string|min:3',
            'logo' => 'nullable|image',
            'size' => 'required|in:small,medium,big',
            'nationality' => 'required|string',
            'business' => 'required|string',
            'website' => 'nullable|string',
            'treatment' => 'nullable|array',
        ];
    }
}
