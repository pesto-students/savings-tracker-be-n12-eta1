import Goal from "../../models/goal.js";
import User from "../../models/user.js";
import {makeErrorsArray} from "../../utils/errors.js";


const getGoals = (async (req, res) => {
    try {
        const user_id = req.user_id;
        console.log(req.query);
        const params = req.query;

        // get pagination data
        let limit = params.perPage || 6;
        let page = params.page || 1;

        const options = {
            page: page,
            limit: limit
          };

        const Goals = await Goal.paginate({}, options, function (err, result) {
            
            return result;
        });

        if (Goals) {

            res.send({success: true, goals: Goals, message: 'Goal fetch successfully'});

        }
        else {
            res.send({success: true, Goals: [], message: 'Goal fetch successfully'});

        }

    } catch (error) {

        const responseErrors = makeErrorsArray(error);
        res.statusCode = 400;

        res.send({success: false, errors: responseErrors});

    }
});
const addGoal = (async (req, res) => {
    try {
        const user_id = req.user_id;
        const {title, description, total_amount, end_date} = req.body;
     
        const goal = new Goal({
                                user_id,
                                title,
                                description,
                                total_amount,
                                end_date
                            });

        await goal.save();
        
        res.send({success: true, goal, message: 'Goal added successfully'});


    } catch (error) {

        const responseErrors = makeErrorsArray(error);
        res.statusCode = 400;

        res.send({success: false, errors: responseErrors});

    }
});


const updateGoal = (async (req, res) => {
    try {
        const user_id = req.user_id;
        const GoalId = req.params.GoalId;

        const {type, start_date, end_date, amount, frequency, description} = req.body;

        const Goal = await Goal.findOne({user_id, _id: GoalId});

        if (!Goal) {
            res.send({success: false, message: 'Not Found'});
            return;
        }

        Goal.type = type;
        Goal.start_date = start_date;
        Goal.end_date = end_date;
        Goal.amount = amount;
        Goal.frequency = frequency;
        Goal.description = description;

        await Goal.save();

        res.send({success: true, Goal});

    }
    catch (error) {

        const responseErrors = makeErrorsArray(error);
        res.statusCode = 400;

        res.send({success: false, errors: responseErrors});

    }

});

const deleteGoal = (async (req, res) => {
    try {
        const user_id = req.user_id;
        const GoalId = req.params.GoalId;


        const result = await Goal.deleteOne({user_id, _id: GoalId});

        if (result && result.deletedCount === 1) {
            res.send({success: true});
        }
        else {
            res.send({success: false, message: 'Not Found'});

        }


    } catch (error) {

        const responseErrors = makeErrorsArray(error);
        res.statusCode = 400;

        res.send({success: false, errors: responseErrors});

    }
});


export default {

    getGoals,
    addGoal,
    updateGoal,
    deleteGoal
}