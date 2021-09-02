import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositorie";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

// classe para a criação de usuario
class CreateUserService {
  async execute({ name, email, admin = false, password }: UserRequest) {
    if (!email || !password) throw new Error("Email or Password incorrect");

    const usersRepository = getCustomRepository(UserRepositories);

    const userAlreadyExists = await usersRepository.findOne({ email });
    if (userAlreadyExists) throw new Error("User already exists!");

    // cripritografando a senha
    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
