export interface AddSourceTbl {
  title: string;
  link: string;
  notes: string;
  argumentid: number;
}

export default interface SourceTbl extends AddSourceTbl {
  id: number;
}
