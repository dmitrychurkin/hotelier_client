import { useCallback, ChangeEvent, SetStateAction } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { EMAIL } from "../Auth";
import { IFormInputs } from "App/types/Form";

export default function useChange(
  setFormState: (setFormState: SetStateAction<IFormInputs>) => void,
  writeEmailToCache = true
) {
  const client = useApolloClient();
  return useCallback(
    ({
      target: { name, value, validationMessage }
    }: ChangeEvent<HTMLInputElement>) => {
      const v = value.trim();

      if (writeEmailToCache && name === EMAIL) {
        client.writeData<{ email: string }>({ data: { email: v } });
      }

      setFormState(state => {
        const inputField = state[name];
        let error = "";
        if (inputField.error) {
          error = validationMessage;
        }

        return {
          ...state,
          [name]: {
            ...inputField,
            error,
            value: v
          }
        };
      });
    },
    [client, setFormState, writeEmailToCache]
  );
}
