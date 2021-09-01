  import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositorie";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: AuthenticateRequest) {
    const userRepository = getCustomRepository(UserRepositories);

    // verificando se email existes
    const user = await userRepository.findOne({ email });
    if (!user) throw new Error("Email/Password Incorrect");

    // comparando senha do input com a do BD
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new Error("Email/Password Incorrect");

    // Gerar token
    const token = sign(
      {
        email: user.email,
      },
      "070749c38fd5c67924dbb8777a59ecb5",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token
  }
}

export { AuthenticateUserService };
