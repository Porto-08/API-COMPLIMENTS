import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositorie";

class DeleteUserService {
  async execute(user_id: string) {
    const userRepositories = getCustomRepository(UserRepositories);

    const user = await userRepositories.findOne(user_id);
    if (!user) throw new Error("User not exists");

    await userRepositories.delete(user_id);
  }
}

export { DeleteUserService };
