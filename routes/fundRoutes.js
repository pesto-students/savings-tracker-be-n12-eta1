import express from 'express'
import fundController from '../controllers/fund/fundController.js'
const router = express.Router()

router.get('/:goal_id',  function(req,res,next){
	fundController.getAllFunds
})
router.post('/:goal_id/create',  function(req,res,next){
	 fundController.investFund
})

router.post('/:goal_id/:fund_id/update', function(req,res,next){
	fundController.updateFund
})
router.post('/:goal_id/:fund_id/delete',function(req,res,next){
	 fundController.deleteFund
})

export default router