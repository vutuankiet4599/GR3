import { Outlet } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
const UserLayout = () => {
    return (
        <div className="min-w-full min-h-screen flex flex-col">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default UserLayout;
