export interface AddAccountTbl {
  email: string;
  name: string;
}

export default interface AccountTbl extends AddAccountTbl {
  id: number;
}
