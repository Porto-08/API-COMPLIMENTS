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
const {
  ListTagsController,
} = require("./controllers/ListTagsController");

const { ensureAdmin } = require("./middlewares/ensureAdmin");
const { ensureAuthenticated } = require("./middlewares/ensureAuthenticated");

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listTagsController = new ListTagsController();

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
  listUserReceiveComplimentsController.handle
);

router.get(
  "/users/compliment/send",
  ensureAuthenticated,
  listUserSendComplimentsController.handle
);

router.get(
  "/tags",
  ensureAuthenticated,
  listTagsController.handle
);

module.exports = { router };
