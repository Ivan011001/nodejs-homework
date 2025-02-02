const { Router } = require("express");

const ctrl = require("../../controllers/users");
const {
  registerSchema,
  loginSchema,
  updateUserSubscription,
} = require("../../validations/usersSchemas");
const { isValidBody, authenticate, upload } = require("../../middlewares");

const router = Router();

router.post("/register", isValidBody(registerSchema), ctrl.register);
router.post("/login", isValidBody(loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.current);
router.patch(
  "/subscription",
  authenticate,
  isValidBody(updateUserSubscription),
  ctrl.updateSubscription
);
router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);
router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
