import express from 'express';
import GoalController from '../controllers/goals/GoalController.js';

const router = express.Router();

router.get('/', GoalController.getGoals);
router.post('/', GoalController.addGoal);
router.put('/:GoalId', GoalController.updateGoal);
router.delete('/:GoalId', GoalController.deleteGoal);

export default router