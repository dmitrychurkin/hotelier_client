import { Route } from "components/common/AppRoutes/AppRoutes";
import Dashboard from "components/Dashboard";
import NotFound from "components/NotFound";
import Auth from "components/Auth";

const routes: Array<Route> = [
  {
    key: "root",
    path: "/",
    isPrivate: true,
    redirectIfAuthenticated: true
  },
  {
    key: "auth",
    path: ["/login", "/reset", "/reset/:token"],
    redirectIfAuthenticated: true,
    component: Auth
  },
  {
    key: "dashboard",
    path: "/dashboard",
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
