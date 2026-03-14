import { User } from "../database/models/user.model";
import { UserModel } from "../database/mongo/schemas/user";

export async function userExists(email: string): Promise<boolean> {
  try {
    const user = await UserModel.findOne({ email });
    return !!user;
  } catch (e) {
    throw new Error("Error checking user");
  }
}

export async function getUserByEmail(email: string): Promise<User> {
  try {
    const user = await UserModel.findOne({ email }).select("-orders");
    return user;
  } catch (e) {
    throw new Error("User not found");
  }
}

export async function createUser(user: User): Promise<User> {
  try {
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser;
  } catch (e) {
    throw new Error("Error creating user");
  }
}
