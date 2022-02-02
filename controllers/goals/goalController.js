import Goal from "../../models/goal.js";
import {makeErrorsArray} from "../../utils/errors.js";
import User from "../../models/user.js"

const getGoals = (async (req, res) => {
    try {
        const user_id = req.user_id;
        const params = req.query;
        const searchData = JSON.parse(params.searchData);
        // get pagination data
        let limit = params.perPage || 6;
        let page = params.page || 1;
        let search = searchData.search || '';
        let orderBy = searchData.order_by || 'start_date';
        let sortBy = searchData.sort_by || 'desc';
        let status = searchData.status || 'All';
        let start_date = searchData.start_date || '';
        let end_date = searchData.end_date || '';

        const options = {
            page: page,
            limit: limit,
            sort: {[orderBy]: sortBy}
        };

        const query = {user_id};

        if (status !== 'All') {
            query.status = status
        }

        if (search !== '') {
            query.title = {'$regex': `^${search}`, '$options': 'i'}
        }

        if (start_date !== '' && end_date !== '') {
            query.start_date = {$gte: start_date, $lt: end_date}
        }

        const Goals = await Goal.paginate(query, options);
        const user = await User.findOne({user_id}, ['currency']);

        res.send({success: true, goals: Goals,currency: user.currency, message: 'Goal fetch successfully'});
    } catch (error) {

        const responseErrors = makeErrorsArray(error);
        res.statusCode = 400;

        res.send({success: false, errors: responseErrors,message:error.message});

    }
});

const getGoalDetails = (async(req,res,next)=>{
    try {
        const user_id = req.user_id;
        const goal_id = req.params.GoalId
        const goal = await Goal.findOne({user_id, _id: goal_id});
        if(goal){
            var newData = {
                _id:goal._id,
                user_id:user_id,
                title:goal.title,
                description:goal.description,
                status:goal.status,
                total_amount:goal.total_amount
            }
            newData.start_date = goal.start_date.toLocaleDateString()
            newData.end_date = goal.end_date.toLocaleDateString()

            res.send({success: true, goal:newData, message: 'Goal found successfully'});
        }
        res.send({success: true, goal:goal, message: 'Goal not found'});
    
    } catch (error) {

        const responseErrors = makeErrorsArray(error);
        res.statusCode = 400;

        res.send({success: false, errors: responseErrors});

    }
})

const addGoal = (async (req, res) => {
    try {
        const user_id = req.user_id;
        const {title, description, total_amount, end_date} = req.body;
        const status = "Recent"
        const goal = new Goal({
                                  user_id,
                                  title,
                                  description,
                                  total_amount,
                                  end_date,
                                  status
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

        const {title, description, total_amount, end_date} = req.body;

        const data = await Goal.findOne({user_id, _id: GoalId});

        if (!data) {
            res.send({success: false, message: 'Goal Not Found'});
            return;
        }

        data.title = title;
        data.description = description;
        data.end_date = end_date;
        data.total_amount = total_amount;

        await data.save();

        res.send({success: true, Goal, message: 'Goal updated successfully'});

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
        const goalId = req.params.GoalId;

        const result = await Goal.deleteOne({user_id, _id: goalId});

        if (result && result.deletedCount === 1) {
            res.send({success: true, message: 'Goal deleted successfully'});
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
    getGoalDetails,
    addGoal,
    updateGoal,
    deleteGoal
}