import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticatedUserService = new AuthenticateUserService();
    
    const token = await authenticatedUserService.execute({
      email,
      password, 
    });

    return res.json(token)
  }
}

export { AuthenticateUserController };
