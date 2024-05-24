<?php

namespace App\Http\Requests\Company\Quiz;

use Illuminate\Foundation\Http\FormRequest;

class CreateNewQuiz extends FormRequest
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
            'title' => 'required|string',
            'questions' => 'required|array',
            'questions.*.title' => 'required|string',
            'questions.*.correct_answer' => 'required|string',
            'questions.*.wrong_answer_first' => 'required|string',
            'questions.*.wrong_answer_second' => 'required|string',
            'questions.*.wrong_answer_third' => 'required|string',
        ];
    }
}
