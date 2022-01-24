import express from 'express'
import Goals from '../models/goal.js'
import goalsController from '../controllers/goal/goalController.js'

const router = express.Router();

router.get('/', function (req, res, next) {
    try {

        Goals.find({}).then(function (goals) {
            res.send(goals)
        }).catch(next)
    } catch (e) {
        res.send({error: true, message: e.message})
    }
});

router.post('/create', goalsController.createGoal);

export default router