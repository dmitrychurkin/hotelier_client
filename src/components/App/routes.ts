import { Route } from "components/common/AppRoutes/AppRoutes";
import Login from "components/Login";
import Dashboard from "components/Dashboard";
import PasswordEmail from "components/PasswordEmail";

const routes: Array<Route> = [
  {
    key: "root",
    path: "/",
    exact: true,
    isPrivate: true,
    redirectIfAuthenticated: true
  },
  {
    key: "login",
    path: "/login",
    redirectIfAuthenticated: true,
    component: Login
  },
  {
    key: "dashboard",
    path: "/dashboard",
    isPrivate: true,
    component: Dashboard
  },
  {
    key: "password-email",
    path: "/reset",
    redirectIfAuthenticated: true,
    component: PasswordEmail
  }
];

export default routes;
