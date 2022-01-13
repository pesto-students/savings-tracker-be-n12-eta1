import express from 'express'
import userController from '../controllers/user/userController.js'
const router = express.Router()

router.post('/all-users', verifyUser,function(req, res){
	userController.getUsers
})

router.post('/save-mobile', verifyUser,function(req, res){
	userController.saveMobile
})

async function verifyUser(req,res,next) {
	next()
}

export default router