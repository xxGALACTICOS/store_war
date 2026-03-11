import { userservice } from "../services/user.service";

export function userhandler(req: any, res: any) {
  const msg = userservice("ahmed");

  res.send(msg);
}
