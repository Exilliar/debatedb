import UserInput from "./UserInput";

export default interface ModalInput {
  params: {
    title: string;
    inputs: UserInput[];
  };
}
