const express = require("express");
const {
  getUsers,
  getAllTopSkills,
  getUser,
  updateUser,
  deleteUser,
  userPhotoUpload,
  createUser,
} = require("../controller/bootcamp");

const router = express.Router();

// Re Route into other resources

router.route("/:id/photo").put(userPhotoUpload);

router.route("/").get(getUsers).post(createUser);
router.route("/rolls").get(getAllTopSkills);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
