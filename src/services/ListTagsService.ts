import { getCustomRepository } from "typeorm";
import { TagRepositories } from "../repositories/TagRepositorie";

class ListTagsService {
  async execute() {
    const tagsRespositories = getCustomRepository(TagRepositories);
    const tags = await tagsRespositories.find();

    return tags;
  }
}

export { ListTagsService };
