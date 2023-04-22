const express = require('express');
const router = express.Router();


//Controllers
const homeController = require('modules/controllers/api/v1/homeController');
const courseController = require('modules/controllers/api/v1/courseController');
const episodeController = require('modules/controllers/api/v1/episodeController');
const authController = require('modules/controllers/api/v1/authController');
const userController = require('modules/controllers/api/v1/userController');

//MiddleWares
const apiAuth = require('modules/middlewares/apiAuth');

//Validators
const registerValidator = require('modules/validators/registerValidator');
const loginValidator = require('modules/validators/loginValidator');



//Admin Controllers
const adminCourseController = require('modules/controllers/api/v1/admin/adminCourseController');
const adminEpisodeController = require('modules/controllers/api/v1/admin/adminEpisodeController');

//Web Routes
router.get('/' , homeController.index);
router.get('/version' , homeController.version);
router.post('/login' , loginValidator.handle() , authController.login);
router.post('/register' , registerValidator.handle() , authController.register);
router.get('/user' , apiAuth , userController.index);

router.get('/courses' , courseController.index);
router.get('/episodes/:id' , episodeController.single);

//Admin Routes
const adminRouter = express.Router();

adminRouter.get('/courses' , adminCourseController.index);
adminRouter.get('/courses/:id' , adminCourseController.single);
adminRouter.post('/courses' , adminCourseController.store);
adminRouter.put('/courses/:id' , adminCourseController.update);
adminRouter.delete('/courses/:id' , adminCourseController.destroy);

adminRouter.get('/episodes' , adminEpisodeController.index);
adminRouter.get('/episodes/:id' , adminEpisodeController.single);
adminRouter.post('/episodes' , adminEpisodeController.store);
adminRouter.put('/episodes/:id' , adminEpisodeController.update);
adminRouter.delete('/episodes/:id' , adminEpisodeController.destroy)

router.use('/admin', apiAuth , adminRouter);



module.exports = router;