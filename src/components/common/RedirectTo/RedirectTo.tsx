import React, { memo } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { UserData } from "lib/types";
import { USER_CACHE } from "lib/queries/client";
import { REFERRER_STATE_KEY } from "consts";

type Props = {
  readonly handleFailure?: boolean;
  readonly handleSuccess?: boolean;
};

const RedirectTo: React.FC<Props> = ({ handleFailure, handleSuccess }) => {
  const { data, loading } = useQuery<UserData, void>(USER_CACHE);
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!handleFailure && !handleSuccess) {
    return (
      <Redirect
        to={
          data?.user
            ? location.state?.[REFERRER_STATE_KEY] || "/dashboard"
            : "/login"
        }
      />
    );
  }

  if (handleSuccess && data?.user) {
    return (
      <Redirect to={location.state?.[REFERRER_STATE_KEY] || "/dashboard"} />
    );
  }

  if (handleFailure && !data?.user) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { [REFERRER_STATE_KEY]: location.pathname }
        }}
      />
    );
  }

  return null;
};

export default memo(RedirectTo);
