import express from 'express'
const router = express.Router()

router.post('/notifyHelper', function(){
	console.log("notify")
})

export default router