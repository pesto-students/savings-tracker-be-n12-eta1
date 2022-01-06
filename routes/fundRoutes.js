import express from 'express'
const router = express.Router()

router.post('/all-funds', function(){
	console.log("get all funds")
})

export default router