import { Route } from "./common/AppRoutes/AppRoutes";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import Auth, { childRoutes as authRoutes } from "./Auth";
import PasswordReset from "./Auth/PasswordReset";

export const PASSWORD_RESET_ROUTE = "/reset/:token";
export const DASHBOARD_ROUTE = "/dashboard";

const routes: Array<Route> = [
  {
    key: "root",
    path: "/",
    isPrivate: true,
    redirectIfAuthenticated: true
  },
  {
    key: "auth",
    path: authRoutes,
    redirectIfAuthenticated: true,
    component: Auth
  },
  {
    key: "password-reset",
    path: PASSWORD_RESET_ROUTE,
    component: PasswordReset
  },
  {
    key: "dashboard",
    path: DASHBOARD_ROUTE,
    isPrivate: true,
    component: Dashboard
  },
  {
    key: "not-found",
    path: "*",
    component: NotFound
  }
];

export default routes.map(route => ({
  ...route,
  exact: true,
  strict: true,
  sensitive: true
}));
