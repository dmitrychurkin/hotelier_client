import React, { Fragment, Suspense, memo } from "react";
import {
  Switch,
  RouteProps,
  Route as AppRoute,
  Redirect
} from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { UserData } from "App/types/User";
import { USER_CACHE } from "App/queries/client";
import Spinner from "../Spinner";
import { LOGIN_ROUTE, DASHBOARD_ROUTE } from "App/constants";

interface IRoute {
  readonly key: string;
  readonly isPrivate?: boolean;
  readonly redirectIfAuthenticated?: boolean;
}

export type Route = RouteProps & IRoute;

type Props = {
  readonly config: Array<Route>;
  readonly wrapWithSwitch?: boolean;
  readonly preloader?: React.FC;
};

const AppRouter: React.FC<Props> = ({
  config = [],
  wrapWithSwitch = true,
  preloader: Fallback = Spinner
}) => {
  const { data } = useQuery<UserData, void>(USER_CACHE);
  const Wrapper = wrapWithSwitch ? Switch : Fragment;

  return (
    <Suspense fallback={<Fallback />}>
      <Wrapper>
        {config.map(
          ({ isPrivate, redirectIfAuthenticated, component, ...route }) => (
            <AppRoute
              {...route}
              render={({ location }) => {
                if (isPrivate && !data) {
                  return (
                    <Redirect
                      to={{
                        pathname: LOGIN_ROUTE,
                        state: { from: location }
                      }}
                    />
                  );
                }
                if (redirectIfAuthenticated && data?.user) {
                  return (
                    <Redirect to={location.state?.from || DASHBOARD_ROUTE} />
                  );
                }
                const Component = component as React.FC;
                return <Component />;
              }}
            />
          )
        )}
      </Wrapper>
    </Suspense>
  );
};

export default memo(AppRouter);
