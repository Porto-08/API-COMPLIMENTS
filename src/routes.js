const { Router } = require("express");
const { CreateUserController } = require("./controllers/CreateUserController");
const { CreateTagController } = require("./controllers/CreateTagController");
const { ensureAdmin } = require("./middlewares/ensureAdmin");


const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

router.post("/users", createUserController.handle);

router.post("/tags",  ensureAdmin, createTagController.handle);

module.exports = { router };
