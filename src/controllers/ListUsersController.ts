import { Response, Request } from "express";
import { ListUsersService } from "../services/ListUsersService";

class ListUsersController {
  async handle(req: Request, res: Response) {
    const userListService = new ListUsersService();
    const user = await userListService.execute();

    return res.json(user);
  }
}

export { ListUsersController };
