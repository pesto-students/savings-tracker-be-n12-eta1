import express from 'express';
import GoalController from '../controllers/goals/goalController.js';

const router = express.Router();

router.get('/', GoalController.getGoals);
router.get('/:GoalId', GoalController.getGoalDetails);
router.post('/', GoalController.addGoal);
router.put('/:GoalId', GoalController.updateGoal);
router.delete('/:GoalId', GoalController.deleteGoal);


export default router