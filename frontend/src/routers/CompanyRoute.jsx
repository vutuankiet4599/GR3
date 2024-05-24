import CompanyLayout from "../pages/company/layout";
import HomePage from "../pages/company/home";
import DashboardPage from "../pages/company/dashboard";
import CompanyJobPage from "../pages/company/job";
import QuizPage from "../pages/company/quiz";
import QuizDetailPage from "../pages/company/quiz/quiz-detail";

const CompanyRouter = {
    path: "/company",
    element: <CompanyLayout />,
    children: [
        {
            index: true,
            element: <HomePage />,
        },
        {
            path: "/company/dashboard",
            element: <DashboardPage />,
        },
        {
            path: "/company/jobs/:id",
            element: <CompanyJobPage />,
        },
        {
            path: "/company/quizzes",
            element: <QuizPage />,
        },
        {
            path: "/company/quizzes/:id",
            element: <QuizDetailPage />,
        },
    ],
};

export default CompanyRouter;
