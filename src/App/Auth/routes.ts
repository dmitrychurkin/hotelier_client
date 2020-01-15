import Login from "./Login";
import PasswordEmail from "./PasswordEmail";
import { LOGIN_ROUTE } from "App/constants";

export const PASSWORD_EMAIL_ROUTE = "/reset";

const routes = [
  {
    key: "login",
    path: LOGIN_ROUTE,
    component: Login
  },
  {
    key: "password-email",
    path: PASSWORD_EMAIL_ROUTE,
    component: PasswordEmail
  }
];

export const childRoutes = routes.map(({ path }) => path);

export default routes;
