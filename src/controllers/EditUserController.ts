import { Request, Response } from "express";
import { EditUserService } from "../services/EditUserService";

class EditUserController {
  async handle(req: Request, res: Response) {
    const { name, email, admin } = req.body;
    const { user_id } = req;

    const editUserService = new EditUserService();
    
    const user = await editUserService.execute({ user_id, name, email, admin });

    return res.json(user);
  }
}

export { EditUserController };
