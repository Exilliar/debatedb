import TableBase from "./TableBase";
import UserTbl from "../elements/userTbl";
import UserData from "../data/user";

import AuthUser from "@/auth/models/User";

export default class UserDatadb extends TableBase<UserTbl> {
  constructor(refresh?: () => Promise<any>) {
    super(UserData, refresh);
  }

  async getSingle(authUser: AuthUser) {
    // Can probably just be handled fully by the backend when that's been made
    const userData = await super.get();

    const user = userData.filter((u) => u.email === authUser.email);

    if (user.length > 0) return user[0];

    const newUser: UserTbl = {
      id: super.size(),
      email: authUser.email,
      name: authUser.name,
    };

    await super.add(newUser);

    return newUser;
  }
}
