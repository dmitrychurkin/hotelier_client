import { IUser } from "App/types/User";

export type ResetPasswordCredPayload = {
  readonly resetPasswordCred: string;
};

export type ResetPasswordCredDetails = {
  readonly passwordResetToken: string;
};

export type ResetPasswordPayload = {
  readonly resetPassword: IUser;
};

export type ResetPasswordDetails = {
  readonly email: string;
  readonly password: string;
  readonly confirmPassword: string;
  readonly passwordResetToken: string;
};
