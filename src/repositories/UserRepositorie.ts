import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

// repositorio da minha entidade
@EntityRepository(User)
class UserRepositories extends Repository<User> {}

export { UserRepositories };
