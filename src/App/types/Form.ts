export abstract class AbstractForm implements IFormInputs {
  [key: string]: IInput;

  constructor(inputs: IFormInputs) {
    for (const [key, value] of Object.entries(inputs)) {
      this[key] = value;
    }
  }
}

export interface IInput {
  value: string;
  error: string;
  ref: React.MutableRefObject<HTMLInputElement | undefined>;
}

export interface IFormInputs {
  readonly [key: string]: IInput;
}
