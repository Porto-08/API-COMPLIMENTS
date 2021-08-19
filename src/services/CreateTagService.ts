import { getCustomRepository } from "typeorm";
import { TagRepositories } from "../repositories/TagRepositorie";

interface TagRequest {
  name: string;
}

class CreateTagService {
  async execute({ name }: TagRequest) {
    if (!name) throw new Error("Name Incorrect!");

    const tagRepository = getCustomRepository(TagRepositories);

    const tagAlreadyExists = await tagRepository.findOne({ name });
    if (tagAlreadyExists) throw new Error("Tag Already Exists");

    const tag = tagRepository.create({
      name,
    });

    await tagRepository.save(tag);

    return tag;
  }
}

export { CreateTagService };
