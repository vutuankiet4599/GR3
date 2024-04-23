import { Navigate, Outlet } from "react-router-dom";
import Footer from "../../../components/Footer";
import { useSelector } from "react-redux";
import { companySelector } from "../../../redux/selectors";
import Header from "../../../components/Company/Header";

const CompanyLayout = () => {
    const company = useSelector(companySelector);
    if (!company.business) {
        return <Navigate to="/" replace />;
    }
    return (
        <div className="min-w-full min-h-screen flex flex-col">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default CompanyLayout;
