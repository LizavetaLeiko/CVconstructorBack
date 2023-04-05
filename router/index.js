const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const userDataController = require("../controllers/userData-controller")
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users',  userController.getUsers);
router.get('/user/:id', authMiddleware, userController.getUser);
router.put('/userdata', authMiddleware, userDataController.setUserData);
router.get('/userdata/:id', authMiddleware, userDataController.getUserData);



module.exports = router
