const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();

const {
  addUser,
  initLogin,
  //   getAllUsers,
  //   logOut,
  getUsers,
  //   logOutAll,
  validateToken,
  updateUserById,
  searchUser
  //   saveUser,
} = require("../controllers/userController");

router.get("/", (req, res) => {
  res.send("hello");
});
router.post("/login", initLogin);
router.post("/validateToken", validateToken);
router.post("/", addUser);
router.post("/get", getUsers);
router.post("/UpdateById", updateUserById);
router.post("/search", searchUser);
// router.post('/logout', auth, logOut);
// router.post('/logoutAll', auth, logOutAll);
// router.post('/save-user/', auth, saveUser);
module.exports = router;
