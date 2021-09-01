import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UserRepositories } from "../repositories/UserRepositorie";

interface ComplimentsRequest {
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    user_sender,
    user_receiver,
    tag_id,
    message,
  }: ComplimentsRequest) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
    const usersRepositories = getCustomRepository(UserRepositories);

    // verificando se user_sender e user_receiver são iguais
    if (user_sender === user_receiver)
      throw new Error("Incorrect User Receiver");

    // verificando se user que recebe a mensagem existe
    const userReceiverExists = usersRepositories.findOne(user_receiver);
    if (!userReceiverExists) throw new Error("User Receiver Not Exists");

    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await complimentsRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
