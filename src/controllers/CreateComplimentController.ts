import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentsService";

class CreateComplimentController {
  async handle(req: Request, res: Response) {
    const { user_sender, user_receiver, tag_id, message } = req.body; //

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      user_sender,
      user_receiver,
      tag_id,
      message,
    });

    res.json(compliment);
  }
}

export { CreateComplimentController };
