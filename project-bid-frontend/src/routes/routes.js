import { createBrowserRouter } from "react-router-dom";

import Login from "../components/pages/login/Login";
import Registration from "../components/pages/registration/Registration";
import UserDashboard from "../components/pages/userDashboard/UserDashboard";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Registration />
  },
  {
    path: '/userDashboard',
    element: <UserDashboard />
  }
]);

export default routes;