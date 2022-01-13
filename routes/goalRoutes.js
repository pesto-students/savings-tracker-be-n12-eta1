import express from 'express'
import Goals from '../models/goal.js'

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

router.post('/', function (req, res, next) {
    try {
        Goals.create(req.body).then(function (goal) {
            res.send(goal);
        }).catch(next);
    } catch (e) {
        res.send({error: true, message: e.message})
    }

});

export default router