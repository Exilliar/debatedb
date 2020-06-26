import TableBase from "./TableBase";
import AccountTbl from "../elements/accountTbl";
import AccountData from "../data/account";

import AuthAccount from "@/auth/models/Account";

export default class AccountDatadb extends TableBase<AccountTbl> {
  constructor(refresh?: () => Promise<any>) {
    super(AccountData, refresh);
  }

  async getSingle(authAccount: AuthAccount): Promise<AccountTbl> {
    return new Promise((resolve) => {
      // Can probably just be handled fully by the backend when that's been made
      super.get().then((accountData) => {
        const account = accountData.filter((u) =>
          u.email === authAccount.email
        );

        if (account.length > 0) resolve(account[0]);

        const newAccount: AccountTbl = {
          id: super.size(),
          email: authAccount.email,
          name: authAccount.name,
        };

        super.add(newAccount).then(() => {
          resolve(newAccount);
        });
      });
    });
  }
}
