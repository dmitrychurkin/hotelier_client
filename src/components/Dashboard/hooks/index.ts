import { useCallback } from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { LOGOUT } from "../mutations/api";

export function useLogout() {
  const client = useApolloClient();
  const [logout] = useMutation<{ logout: boolean }, void>(LOGOUT);

  return useCallback(async () => {
    try {
      await logout().then(() => client.resetStore());
    } catch {}
  }, [client, logout]);
}
