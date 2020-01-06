import React, { Fragment, Suspense, memo } from "react";
import {
  Switch,
  RouteProps,
  Route as AppRoute,
  Redirect
} from "react-router-dom";
import { UserData } from "lib/types";
import { useQuery } from "@apollo/react-hooks";
import { USER_CACHE } from "lib/queries/client";

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
  preloader: Fallback = () => <div>Route loading...</div>
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
                        pathname: "/login",
                        state: { from: location }
                      }}
                    />
                  );
                }
                if (redirectIfAuthenticated && data?.user) {
                  return <Redirect to={location.state?.from || "/dashboard"} />;
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
