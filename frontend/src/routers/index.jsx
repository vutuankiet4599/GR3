import { createBrowserRouter } from "react-router-dom";
import UserRouter from "./UserRouter";
import CompanyRouter from "./CompanyRoute";

const routers = Object.values({
    UserRouter,
    CompanyRouter,
});

const Router = createBrowserRouter(routers);

export default Router;
