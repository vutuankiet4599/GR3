<?php

namespace App\Http\Requests\Company\Job;

use Illuminate\Foundation\Http\FormRequest;

class CreateJobRequest extends FormRequest
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
            'name' => 'required|string',
            'salary' => 'required|string',
            'welfare' => 'array',
            'welfare.*' => 'string',
            'experience' => 'required|integer|min:0',
            'interview' => 'array',
            'interview.*' => 'string',
            'type' => 'required|string|in:in office,remote,hybrid',
            'contract' => 'required|string|in:parttime,fulltime,freelance',
            'work' => 'array',
            'work.*' => 'string',
            'skill' => 'array',
            'skill.*' => 'string',
            'level' => 'required|string|in:intern,fresher,junior,middle,senior,leader,manager',
            'city_id' => 'required|integer|min:1',
            'tags' => 'array',
            'name' => 'required|integer',
        ];
    }
}
