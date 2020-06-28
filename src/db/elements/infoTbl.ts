export interface AddInfoTbl {
  description: string;
  current: string;
  counter: string;
}

export default interface InfoTbl extends AddInfoTbl {
  id: number;
}
