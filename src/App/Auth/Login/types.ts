import { IUser } from "App/types/User";
import { IFormInputs, IInput } from "App/types/Form";

export type LoginPayload = {
  readonly login: IUser;
};

export type LoginDetails = {
  readonly email: string;
  readonly password: string;
};

export interface ILoginForm extends IFormInputs {
  readonly email: IInput;
  readonly password: IInput;
}
