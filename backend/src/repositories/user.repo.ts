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

export async function createUser(user: Pick<User, "username" | "email" | "password" | "phone">): Promise<void> {
  try {

    const newUser = new UserModel(user);
    await newUser.save();

  } catch (e) {
    throw new Error("Error creating user");
  }
}

export async function updateUserPassword(email: string, password: string): Promise<boolean> {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return false;
    }
    user.password = password;
    await user.save();
    return true;
  } catch (e) {
    throw new Error("Error updating user password");
  }
}
