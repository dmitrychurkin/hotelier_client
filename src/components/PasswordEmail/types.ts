export type SendPasswordResetPayload = {
  readonly sendPasswordResetLink: boolean;
};

export type SendPasswordResetDetails = {
  readonly email: string;
  readonly path: string;
};
