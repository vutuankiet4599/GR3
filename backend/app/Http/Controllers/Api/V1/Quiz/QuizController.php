<?php

namespace App\Http\Controllers\Api\V1\Quiz;

use App\Http\Controllers\Controller;
use App\Http\Requests\Company\Quiz\CreateNewQuiz;
use App\Http\Requests\Dev\Quiz\AnswerQuizRequest;
use App\Models\Application;
use App\Repositories\Quiz\QuizRepository;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    use ResponseTrait;
    protected $repository;

    public function __construct(QuizRepository $repository) {
        $this->repository = $repository;
    }
    public function createQuiz(CreateNewQuiz $request)
    {
        try {
            $company = $request->user('companies');
            $data = $request->validated();
            $quiz = $this->repository->create(['title' => $data['title'], 'company_id' => $company->id]);
            $quiz->questions()->createMany($data['questions']);
            return $this->success([], "Create quiz successfully", 201);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function companyQuizzes(Request $request)
    {
        try {
            $company = $request->user('companies');
            $quizzes = $company->quizzes->load(['questions', 'users']);
            return $this->success($quizzes);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function getQuiz(Request $request, $id)
    {
        try {
            $quiz = $this->repository->find($id);
            if (empty($quiz)) {
                return $this->failure([], 'No Quiz found', '', 404);
            }
            $quiz->load('questions');
            return $this->success($quiz);
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }

    public function answerQuiz(AnswerQuizRequest $request, $id)
    {
        try {
            $data = $request->validated();
            $user = $request->user('users');
            $quiz = $this->repository->find($id);
            $company = $quiz->company;

            $hasApplied = Application::where('user_id', $user->id)
                ->whereHas('applicationJob', function ($q) use ($company) {
                    $q->where('company_id', $company->id);
                })->exists();

            if (!$hasApplied) {
                return $this->failure([], 'You are not allowed to do this quiz.', 403, 403);
            }

            $user->quizzes()->detach($quiz->id);
            $user->quizzes()->attach($quiz->id, ['score' => $data['score']]);

            return $this->success([], 'Answer done');
        } catch (\Throwable $th) {
            return $this->failure($th->getTrace(), $th->getMessage(), $th->getCode());
        }
    }
}
