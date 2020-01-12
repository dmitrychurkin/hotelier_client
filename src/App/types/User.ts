
export type UserData = {
  readonly user: IUser;
};

export interface IUser {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: UserRoles;
  readonly createdAt: string;
}

export enum UserRoles {
  ADMIN = "ADMIN",
  OWNER = "OWNER",
  EMPLOYER = "EMPLOYER"
}