export interface AddDebateTbl {
  title: string;
  description: string;
  generalnotes: string;
  infoid: number;
  accountid: number;
}

export default interface DebateTbl extends AddDebateTbl {
  id: number;
}
