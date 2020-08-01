import DeleteMethod from "./DeleteMethod";

export interface Additional {
  title: string;
  deleteMethod: DeleteMethod;
  items: AdditionalDeleteItems[];
}

export interface AdditionalDeleteItems {
  title: string;
  id: number;
}

export interface SettingsModalShow {
  id: number;
  deleteMethod: DeleteMethod;
  additional?: Additional;
}

export default interface SettingsModalInput {
  params: SettingsModalShow;
}
