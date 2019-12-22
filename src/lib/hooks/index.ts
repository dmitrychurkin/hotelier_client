import { useApolloClient } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { AUTH_TOKEN_NAME, REFERRER_STATE_KEY } from "consts";
import { useCallback } from "react";

export function useLogout() {
  const client = useApolloClient();
  const history = useHistory();
  const cb = useCallback(() => {
    return client.clearStore().finally(() => {
      localStorage.removeItem(AUTH_TOKEN_NAME);
      history.replace("/login", {
        [REFERRER_STATE_KEY]: history.location.pathname
      });
    });
  }, [client, history]);

  return cb;
}
