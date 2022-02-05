import Goal from "../../models/goal.js";
import {makeErrorsArray} from "../../utils/errors.js";
import User from "../../models/user.js"
import Fund from "../../models/fund.js";

async function populateFundsToGoals_(user_id, docs) {

    let goalIds = docs.map(goal => goal._id);

    let funds = await Fund.find({user_id, goal_id: {$in: goalIds}});

    const goalsFundsMap = {};

    for (let i = 0; i < funds.length; i++) {
        const fund = funds[i];

        if (!goalsFundsMap[fund.goal_id]) {
            goalsFundsMap[fund.goal_id] = 0;
        }
        goalsFundsMap[fund.goal_id] += fund.amount;

    }

    docs.forEach(doc => {
        doc.saved_amount = goalsFundsMap[doc._id.toString()] || 0;
    });
    return docs;
}

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
            lean: true,
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

        const goals = await Goal.paginate(query, options);
        const user = await User.findOne({user_id}, ['currency']);

        if (goals.docs.length > 0) {
            goals.docs = await populateFundsToGoals_(user_id, goals.docs);
        }


        const currency = user.currency;

        res.send({success: true, goals: goals, currency: currency, message: 'Goal fetch successfully'});


    } catch (error) {

        const responseErrors = makeErrorsArray(error);
        res.statusCode = 400;

        res.send({success: false, errors: responseErrors, message: error.message});

    }
});

const getGoalDetails = (async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const goal_id = req.params.GoalId
        const goal = await Goal.findOne({user_id, _id: goal_id});
        res.send({success: true, goal: goal, message: 'Goal not found'});

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