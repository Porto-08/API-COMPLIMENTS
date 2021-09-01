const { Router } = require("express");
const { CreateUserController } = require("./controllers/CreateUserController");
const { CreateTagController } = require("./controllers/CreateTagController");
const {
  AuthenticateUserController,
} = require("./controllers/AuthenticateUserController");
const {
  CreateComplimentController,
} = require("./controllers/CreateComplimentController");

const { ensureAdmin } = require("./middlewares/ensureAdmin");

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();

router.post("/users", createUserController.handle);
router.post("/tags", ensureAdmin, createTagController.handle);
router.post("/compliments", ensureAdmin, createComplimentController.handle);
router.post("/login", authenticateUserController.handle);

module.exports = { router };
