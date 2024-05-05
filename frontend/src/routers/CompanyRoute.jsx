import CompanyLayout from "../pages/company/layout";
import HomePage from "../pages/company/home";
import DashboardPage from "../pages/company/dashboard";
import CompanyJobPage from "../pages/company/job";
import CandidatePage from "../pages/company/candidate";

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
            path: "/company/candidates",
            element: <CandidatePage />,
        },
    ],
};

export default CompanyRouter;
