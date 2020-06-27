import AccountTbl from "../elements/accountTbl";
import AxiosFuncs from "./AxiosFuncs";
import AuthAccount from "@/auth/models/Account";

interface AddAccountTbl {
  email: string;
  name: string;
}

export default class AccountDatadb {
  private standardEndpoint = "account/";
  private axiosFuncs = new AxiosFuncs<AccountTbl, AddAccountTbl>();

  async getAll(): Promise<AccountTbl[]> {
    return await this.axiosFuncs.getAll(this.standardEndpoint);
  }
  async getSingle(authAccount: AuthAccount): Promise<AccountTbl> {
    let account = await this.axiosFuncs.getSingle(
      this.standardEndpoint + authAccount.email
    );

    if (Object.keys(account).length !== 0) return account;

    await this.add({
      email: authAccount.email,
      name: authAccount.name,
    });

    account = await this.axiosFuncs.getSingle(
      this.standardEndpoint + authAccount.email
    );

    return account;
  }
  async add(newAccount: AddAccountTbl): Promise<number> {
    return await this.axiosFuncs.add(this.standardEndpoint, newAccount);
  }
  async update(updateAccount: AccountTbl): Promise<void> {
    return await this.axiosFuncs.update(
      this.standardEndpoint + updateAccount.id,
      updateAccount
    );
  }
  async delete(accountid: number): Promise<void> {
    return await this.axiosFuncs.delete(this.standardEndpoint + accountid);
  }
}
