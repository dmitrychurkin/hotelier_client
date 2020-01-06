import { Route } from "components/common/AppRoutes/AppRoutes";
import Login from "./Login";
import PasswordEmail from "./PasswordEmail";
import PasswordReset from "./PasswordReset";

const routes: Array<Route> = [
  {
    key: "login",
    path: "/login",
    component: Login
  },
  {
    key: "password-email",
    path: "/reset",
    component: PasswordEmail
  },
  {
    key: "password-reset",
    path: "/reset/:token",
    component: PasswordReset
  }
];

export default routes;
