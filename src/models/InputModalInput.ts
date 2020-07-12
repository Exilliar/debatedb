import UserInput from "./UserInput";

export default interface InputModalInput {
  params: {
    title: string;
    inputs: UserInput[];
    onClose?: () => any;
  };
}
