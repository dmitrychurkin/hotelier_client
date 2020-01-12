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
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = target;
      const v = value.trim();

      if (writeEmailToCache && name === EMAIL) {
        client.writeData<{ email: string }>({ data: { email: v } });
      }

      setFormState(state => {
        const inputField = state[name];
        let error = "";
        if (inputField.error) {
          error = inputField.ref.current?.validationMessage ?? "";
        }

        const updateInput = {
          [name]: {
            ...inputField,
            error,
            value: v
          }
        };
        return { ...state, ...updateInput };
      });
    },
    [client, setFormState, writeEmailToCache]
  );
}
