import DeleteMethod from "./DeleteMethod";

export default interface SettingsModalInput {
  params: {
    id: number;
    deleteMethod: DeleteMethod;
  };
}
