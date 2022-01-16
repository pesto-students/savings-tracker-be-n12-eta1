import express from 'express'
const router = express.Router()

router.get('/:goal_id', fundController.getAllFunds)
router.post('/:goal_id/create', fundController.investFund)
router.post('/:goal_id/:fund_id/update', fundController.updateFund)
router.post('/:goal_id/:fund_id/delete', fundController.deleteFund)

export default router