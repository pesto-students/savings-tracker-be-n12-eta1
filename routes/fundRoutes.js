import express from 'express'
import fundController from '../controllers/fund/fundController.js'
const router = express.Router()

router.get('/:goal_id',fundController.getAllFunds)
router.post('/:goal_id/create',fundController.investFund)

router.put('/:goal_id/:fund_id/update',fundController.updateFund)
router.delete('/:goal_id/:fund_id/delete',fundController.deleteFund)

export default router