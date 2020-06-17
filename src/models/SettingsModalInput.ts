import BaseViewClass from "@/db/BaseViewClass";

export default interface SettingsModalInput {
  params: {
    viewClass: BaseViewClass;
    viewId: number;
  };
}
