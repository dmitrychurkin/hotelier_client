import { useCallback, SetStateAction } from "react";
import { IFormInputs } from "App/types/Form";

export default function useBlur(
  setFormState: (setFormState: SetStateAction<IFormInputs>) => void
) {
  return useCallback(
    ({ target }) => {
      const { name } = target;
      setFormState(state => {
        const updateInput = {
          [name]: {
            ...state[name],
            error: target.validationMessage
          }
        };
        return { ...state, ...updateInput };
      });
    },
    [setFormState]
  );
}
