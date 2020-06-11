import TableBase from "./TableBase";
import UserTbl from "../elements/userTbl";
import UserData from "../data/user";

import AuthUser from "@/auth/models/User";

export default class UserDatadb extends TableBase<UserTbl> {
  constructor(refresh?: () => Promise<any>) {
    super(UserData, refresh);
  }

  async getSingle(authUser: AuthUser): Promise<UserTbl> {
    return new Promise((resolve) => {
      // Can probably just be handled fully by the backend when that's been made
      super.get().then((userData) => {
        const user = userData.filter((u) => u.email === authUser.email);

        if (user.length > 0) resolve(user[0]);

        const newUser: UserTbl = {
          id: super.size(),
          email: authUser.email,
          name: authUser.name,
        };

        super.add(newUser).then(() => {
          resolve(newUser);
        });
      });
    });
  }
}
