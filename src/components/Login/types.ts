import { IUser } from "lib/types";

export type LoginPayload = {
  readonly login: IUser;
};

export type LoginDetails = {
  readonly email: string;
  readonly password: string;
};
