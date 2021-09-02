import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositorie";

class ListUsersService {
  async execute() {
    const usersRepositories = getCustomRepository(UserRepositories);
    const users = usersRepositories.find();

    return users;
  }
}

export { ListUsersService };
