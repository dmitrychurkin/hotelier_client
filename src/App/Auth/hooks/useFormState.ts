import { useState, useRef } from "react";
import { useRouteMatch } from "react-router-dom";
import { IInput, IFormInputs, AbstractForm } from "App/types/Form";
import { PASSWORD_EMAIL_ROUTE } from "App/Auth/routes";
import { PASSWORD_RESET_ROUTE } from "App/constants";
import { EMAIL, PASSWORD, CONFIRM } from "../Auth";

export class AuthForm extends AbstractForm {}

export default function useFormState(emailValue = "") {
  const { path } = useRouteMatch();
  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const confirmPassRef = useRef<HTMLInputElement>();

  return useState<IFormInputs>(() => {
    let form: IFormInputs;
    const input: IInput = {
      ref: emailRef,
      error: "",
      value: emailValue
    };
    switch (path) {
      case PASSWORD_EMAIL_ROUTE:
        form = {
          [EMAIL]: input
        };
        break;

      case PASSWORD_RESET_ROUTE:
        form = {
          [PASSWORD]: {
            ...input,
            ref: passRef
          },
          [CONFIRM]: {
            ...input,
            ref: confirmPassRef
          }
        };
        break;

      default: {
        form = {
          [EMAIL]: input,
          [PASSWORD]: {
            ...input,
            ref: passRef
          }
        };
      }
    }
    return new AuthForm(form);
  });
}
