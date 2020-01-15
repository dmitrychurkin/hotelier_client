import { IFormInputs } from "App/types/Form";

export default function useValidation(
  formInputs: IFormInputs,
  passwordValue = "",
  confirmPasswordValue = ""
) {
  // TODO:
  // 1. refactor validation into abstract class method
  // 2. revise validation rules in IInput interface
  // 3. refactor useValidation hook
  // 4. add toast notifications

  return (
    Object.values(formInputs).every(({ ref }) => {
      const el = ref.current;
      if (!el) {
        return false;
      }
      console.log("el.validationMessage => ", el.validationMessage);
      return el.validationMessage.length === 0;
    }) && passwordValue === confirmPasswordValue
  );
}
