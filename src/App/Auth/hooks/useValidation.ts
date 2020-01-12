import { IFormInputs } from "App/types/Form";

export default function useValidation(
  formInputs: IFormInputs,
  passwordValue = "",
  confirmPasswordValue = ""
) {
  return (
    // TODO: refactor validation into abstract class method
    Object.values(formInputs).every(({ ref }) => {
      const el = ref.current;
      if (!el) {
        return false;
      }
      return !Boolean(el.validationMessage);
    }) && passwordValue === confirmPasswordValue
  );
}
