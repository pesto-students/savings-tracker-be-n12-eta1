import express from 'express'
import sendMailController from '../controllers/contact/sendMailController.js'
const router = express.Router()

/*router.post('/notifyHelper', function(req,res,next){
	console.log("notify")
})*/
router.post('/submit-contact', sendMailController.sendMail)

export default router