import express from 'express'
import userController from '../controllers/user/userController.js'
const router = express.Router()

router.get('/', function(req, res){
	userController.getUsers
})

router.get('/ping', userController.saveMobile)

export default router