import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import CodeEditorPage from "../pages/code/editor";
import HomePage from "../pages/user/home";
import JobDetailPage from "../pages/user/job-detail";
import JobSearchPage from "../pages/user/job-search";
import UserLayout from "../pages/user/layout";
import ProfilePage from "../pages/user/profile";
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
            path: "/code",
            element: <CodeEditorPage />,
        },
    ],
};

export default UserRouter;
