export default interface AccountInput {
  id: number;
  textInput: string;
  type: "text" | "link";
}

export interface AccountInputText extends AccountInput {
  markdown: boolean;
  title: string;
  description: string;
  type: "text";
}

export interface AccountInputLink extends AccountInput {
  rules?: Array<(value: string) => boolean | string>;
  type: "link";
}
