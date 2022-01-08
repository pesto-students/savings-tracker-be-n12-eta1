import express from 'express'
import sendMailController from '../controllers/contact/sendMailController.js'

const router = express.Router()

router.post('/notifyHelper', function(req,res,next){
	console.log("notify")
})

//router.post('/submit-contact',verifyUser, sendMailController.sendEmail)
router.post('/submit-contact',function(req, res){
	sendMailController.sendEmail
  });

async function verifyUser(req,res,next) {
	next()
}

//module.exports= router; 
export default router