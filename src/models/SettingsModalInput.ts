export default interface SettingsModalInput {
  params: {
    id: number;
    deleteMethod: (id: number) => Promise<void>;
  };
}
