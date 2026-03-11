import { createUser, getUser } from "../repositories/user.repo";

export function userservice(user: any) {
  // signup
  // logic
  const exist: any = getUser();
  if (!exist.ok) {
    return "user not found";
  }

  const c: any = createUser();

  return "Service of user";
}
