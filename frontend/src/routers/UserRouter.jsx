import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import CodeEditorPage from "../pages/code/editor";
import CompanyDetailPage from "../pages/user/company-detail";
import HomePage from "../pages/user/home";
import JobDetailPage from "../pages/user/job-detail";
import JobSearchPage from "../pages/user/job-search";
import UserLayout from "../pages/user/layout";
import ProfilePage from "../pages/user/profile";
import QuizPage from "../pages/user/quiz";
import ProtectedRoute from "./ProtectedRoute";

const UserRouter = {
    path: "/",
    element: <UserLayout />,
    children: [
        {
            index: true,
            element: <HomePage />,
        },
        {
            path: "/register",
            element: <RegisterPage />,
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/profile",
            element: (
                <ProtectedRoute>
                    <ProfilePage />
                </ProtectedRoute>
            ),
        },
        {
            path: "/jobs/:id",
            element: <JobDetailPage />,
        },
        {
            path: "/jobs",
            element: <JobSearchPage />,
        },
        {
            path: "/code/:roomCode",
            element: <CodeEditorPage />,
        },
        {
            path: "/companies/:id",
            element: <CompanyDetailPage />,
        },
        {
            path: "/quizzes/:id",
            element: (
                <ProtectedRoute>
                    <QuizPage />
                </ProtectedRoute>
            ),
        },
    ],
};

export default UserRouter;
