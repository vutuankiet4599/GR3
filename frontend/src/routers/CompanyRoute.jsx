import CompanyLayout from "../pages/company/layout";
import HomePage from "../pages/company/home";
import DashboardPage from "../pages/company/dashboard";

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
    ],
};

export default CompanyRouter;
