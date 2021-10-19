import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMassageController";
import { GetMessagesController } from "./controllers/GetMessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);
router.post(
  "/add-message",
  ensureAuthenticated,
  new CreateMessageController().handle
);
router.get("/messages", new GetMessagesController().handle);
router.get("/user", ensureAuthenticated, new ProfileUserController().handle);

export { router };
