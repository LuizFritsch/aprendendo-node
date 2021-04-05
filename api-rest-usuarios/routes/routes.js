var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var AdminAut = require("../middleware/AdminAuth");

router.get('/', HomeController.index);

/**
 * route to create a user
 */
router.post('/user', AdminAut, UserController.create);

/**
 * route to list all users
 */
router.get('/user', AdminAut, UserController.index);

/**
 * route to find user by id
 */
router.get('/user/:id', AdminAut, UserController.findUser);


/**
 * route to edit user by id
 */
router.put('/user/:id', AdminAut, UserController.edit);

/**
 * route to delete user by id
 */
router.delete('/user/:id', AdminAut, UserController.delete);

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


module.exports = router;