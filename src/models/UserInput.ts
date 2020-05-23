export default interface UserInput {
  id: number;
  textInput: string;
}

export interface UserInputText extends UserInput {
  markdown: boolean;
  title: string;
  description: string;
}

export interface UserInputLink extends UserInput {
  rules?: Array<(value: string) => boolean | string>;
}
