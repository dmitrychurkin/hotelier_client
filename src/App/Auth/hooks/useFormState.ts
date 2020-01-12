import { useState, useRef } from "react";
import { useRouteMatch } from "react-router-dom";
import { Input, IFormInputs, AbstractForm } from "App/types/Form";
import { PASSWORD_EMAIL_ROUTE } from "App/Auth/routes";
import { PASSWORD_RESET_ROUTE } from "App/routes";
import { EMAIL, PASSWORD, CONFIRM } from "../Auth";

class AuthForm extends AbstractForm {}

export default function useFormState(emailValue = "") {
  const { path } = useRouteMatch();
  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const confirmPassRef = useRef<HTMLInputElement>();

  return useState<IFormInputs>(() => {
    switch (path) {
      case PASSWORD_EMAIL_ROUTE:
        return new AuthForm({
          [EMAIL]: new Input(emailRef, emailValue)
        });

      case PASSWORD_RESET_ROUTE:
        return new AuthForm({
          [PASSWORD]: new Input(passRef),
          [CONFIRM]: new Input(confirmPassRef)
        });

      default: {
        return new AuthForm({
          [EMAIL]: new Input(emailRef, emailValue),
          [PASSWORD]: new Input(passRef)
        });
      }
    }
  });
}
