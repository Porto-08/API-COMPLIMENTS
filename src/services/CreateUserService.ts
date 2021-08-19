import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositorie";
interface UserRequest {
  name: string;
  email: string;
  admin?: boolean;
}

// classe para a criação de usuario
class CreateUserService {
  async execute({ name, email, admin }: UserRequest) {
    const usersRepository = getCustomRepository(UserRepositories);
    if (!email) throw new Error("Email incorrect");

    const userAlreadyExists = await usersRepository.findOne({ email });
    if (userAlreadyExists) throw new Error("User already exists!");

    const user = usersRepository.create({
      name,
      email,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
