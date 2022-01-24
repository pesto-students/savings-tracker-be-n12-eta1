import express from 'express'
import userController from '../controllers/user/userController.js'

const router = express.Router();


router.get('/onboarding', userController.getStatus);
router.post('/onboarding', userController.onboarding);

router.get('/profile', userController.getProfile);
router.post('/profile', userController.saveProfile);

<<<<<<< HEAD
=======
router.get('/dashboard',userController.getDashboardData);
>>>>>>> origin/feature/dashboard-api

export default router