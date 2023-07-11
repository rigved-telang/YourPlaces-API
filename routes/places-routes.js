const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");

const placesController = require("../controllers/places-controllers");

const router = express.Router();

router.get("/:pid", placesController.getPlaceById);

router.get("/user/:uid", placesController.getPlacesByUserId);


router.post(
  "/",
  checkAuth,
  [
    check("title").notEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").notEmpty(),
  ],
  placesController.createPlace
);

router.patch(
  "/:pid",
  checkAuth,
  [check("title").notEmpty(), check("description").isLength({ min: 5 })],
  placesController.updatePlace
);

router.delete("/:pid", checkAuth, placesController.deletePlace);

module.exports = router;
