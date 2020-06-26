import AccountInput from "./AccountInput";

export default interface ModalInput {
  params: {
    title: string;
    inputs: AccountInput[];
    onClose?: () => any;
  };
}
