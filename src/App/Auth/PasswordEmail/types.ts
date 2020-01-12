import { IFormInputs, IInput } from "App/types/Form";

export type SendPasswordResetPayload = {
  readonly sendPasswordResetLink: boolean;
};

export type SendPasswordResetDetails = {
  readonly email: string;
  readonly path: string;
};

export interface IPasswordEmailForm extends IFormInputs {
  readonly email: IInput;
}
