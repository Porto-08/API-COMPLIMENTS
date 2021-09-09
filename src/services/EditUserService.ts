import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositorie";

interface EditUserInterface {
  user_id: string;
  name: string;
  email: string;
  admin?: boolean;
}

class EditUserService {
  async execute({ user_id, name, email, admin }: EditUserInterface) {
    if (!name || !email) throw new Error("Name and email are required");

    const userRepositories = getCustomRepository(UserRepositories);

    const user = await userRepositories.findOne(user_id);
    if (!user) throw new Error("User not exists");

    user.name = name;
    user.email = email;
    user.admin = admin || user.admin;

    await userRepositories.save(user)

    return user
  }
}

export { EditUserService };
