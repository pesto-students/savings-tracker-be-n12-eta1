import express from 'express'
import contactController from '../controllers/contact/sendMailController'

const router = express.Router()

router.post('/notifyHelper', function(req,res,next){
	console.log("notify")
})

router.post('/submit-contact',verifyUser, contactController.sendEmail)

const verifyUser = (async()=>{
	return true
})

export default router