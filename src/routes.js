const { Router } = require("express");
const { CreateUserController } = require("./controllers/CreateUserController");
const { CreateTagController } = require("./controllers/CreateTagController");
const {
  AuthenticateUserController,
} = require("./controllers/AuthenticateUserController");
const {
  CreateComplimentController,
} = require("./controllers/CreateComplimentController");
const {
  ListUserReceiveComplimentsController,
} = require("./controllers/ListUserReceiveComplimentsController");
const {
  ListUserSendComplimentsController,
} = require("./controllers/ListUserSendComplimentsController");

const { ensureAdmin } = require("./middlewares/ensureAdmin");
const { ensureAuthenticated } = require("./middlewares/ensureAuthenticated");

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();
const listUserReceiveCompliments = new ListUserReceiveComplimentsController();
const listUserSendCompliments = new ListUserSendComplimentsController();

router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);

router.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);
router.post(
  "/compliments",
  ensureAuthenticated,
  ensureAdmin,
  createComplimentController.handle
);

router.get(
  "/users/compliment/receiver",
  ensureAuthenticated,
  listUserReceiveCompliments.handle
);

router.get(
  "/users/compliment/send",
  ensureAuthenticated,
  listUserSendCompliments.handle
);

module.exports = { router };
