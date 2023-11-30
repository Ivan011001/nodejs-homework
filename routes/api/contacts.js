const express = require("express");
const contactController = require("../../controllers");

const router = express.Router();

router.get("/", contactController.get);
router.get("/:contactId", contactController.getByID);
router.post("/", contactController.create);
router.put("/:contactId", contactController.update);
router.patch("/:contactId/favorite", contactController.updateFavorite);
router.delete("/:contactId", contactController.remove);

module.exports = router;
