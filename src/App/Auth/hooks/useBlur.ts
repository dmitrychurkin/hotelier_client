import { useCallback, SetStateAction } from "react";
import { IFormInputs } from "App/types/Form";

export default function useBlur(
  setFormState: (setFormState: SetStateAction<IFormInputs>) => void
) {
  return useCallback(
    ({ target: { name, validationMessage: error } }) => {
      setFormState(state => ({
        ...state,
        [name]: {
          ...state[name],
          error
        }
      }));
    },
    [setFormState]
  );
}
