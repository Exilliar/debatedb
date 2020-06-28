export interface AddQuoteTbl {
  text: string;
  additional: string;
  sourceid: number;
}

export default interface QuoteTbl extends AddQuoteTbl {
  id: number;
}
