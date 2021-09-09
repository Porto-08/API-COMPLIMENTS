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
const { ListTagsController } = require("./controllers/ListTagsController");
const { ListUsersController } = require("./controllers/ListUsersController");
const { DeleteUserController } = require("./controllers/DeleteUserController");

const { ensureAdmin } = require("./middlewares/ensureAdmin");
const { ensureAuthenticated } = require("./middlewares/ensureAuthenticated");

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();
const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();
const deleteUserController = new DeleteUserController();



router.get("/tags", ensureAuthenticated, listTagsController.handle);
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


router.post("/login", authenticateUserController.handle);

router.get("/users", ensureAuthenticated, listUsersController.handle);
router.post("/users", createUserController.handle);
router.delete('/users', ensureAuthenticated, deleteUserController.handle);

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


module.exports = { router };
