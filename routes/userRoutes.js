import express from 'express'
const router = express.Router()

router.post('/all-users', function(){
	console.log("get all users")
})

export default router