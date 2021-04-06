var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var AdminAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);

/**
 * route to create a user
 */
router.post('/user', AdminAuth, UserController.create);

/**
 * route to list all users
 */
router.get('/user', AdminAuth, UserController.index);

/**
 * route to find user by id
 */
router.get('/user/:id', AdminAuth, UserController.findUser);


/**
 * route to edit user by id
 */
router.put('/user/:id', AdminAuth, UserController.edit);

/**
 * route to delete user by id
 */
router.delete('/user/:id', AdminAuth, UserController.delete);

/**
 * route to request a recover password by email
 */
router.post('/recoverPassword', UserController.recoverPassword);

/**
 * route to change password by email
 */
router.post('/changePassword', UserController.changePassword);

/**
 * route to change password by email
 */
router.post('/login', UserController.login);

/**
 * route to validate token from view to backend
 */
router.post("/validate", AdminAuth, HomeController.validate);


module.exports = router;