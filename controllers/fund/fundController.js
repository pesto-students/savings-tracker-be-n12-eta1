import Fund from '../../models/fund.js'
import Goal from '../../models/goal.js'

const getAllFunds = (async (req, res, next) => {
    try {
        var goal_id = req.params.goal_id;
        const funds = await Fund.find({goal_id});
        if (funds) {
            res.send({code: 200, success: true, funds: funds, goal_id: goal_id})
        }
        res.send({code: 200, success: false, funds: funds, goal_id: goal_id})

    } catch (e) {
        res.send({success: false, message: e.message})
    }

});

const investFund = (async (req, res, next) => {
    try {
        /*const deleteFunds = await Fund.deleteMany({})
        console.log(deleteFunds)*/
        var goal_id = req.params.goal_id;
        var fund_data = {};
        var body = req.body;
        fund_data.goal_id = goal_id;
        fund_data.user_id = req.user_id
        fund_data.description = body.description || null;
        fund_data.amount = Number(body.amount) || null;
        const funds = await Fund.create(fund_data);
        const goal = await Goal.findOne({user_id: req.user_id, _id: goal_id});
        
        if (goal) {
            const funds = await Fund.find({goal_id: goal_id});
            if (funds) {
                var totalInvestments = funds.map(fund => fund.amount).reduce((acc, fund) => fund + acc);
                if (totalInvestments < goal.total_amount) {
                    goal.status= "Active"
                } else {
                    goal.status =  "Achieved"
                }
                //var update = await Goal.findOneAndUpdate({user_id: req.user_id, _id: goal_id}, status)
                var update = await goal.save()
            }
        }
        if (funds) {
            res.send({code: 200, success: true, funds: funds, goal_id: goal_id})
        }
        res.send({code: 200, success: false, funds: funds, goal_id: goal_id})

    } catch (e) {
        res.send({success: false, message: e.message})
    }

});

const updateFund = (async (req, res, next) => {
    try {
        var fund_data = {};
        var body = req.body;
        //fund_data.goal_id = req.params.goal_id
        fund_data.user_id = req.user_id;
        fund_data.description = body.description || null;
        fund_data.amount = Number(body.amount) || null;

        const fund = await Fund.findOneAndUpdate({_id: req.params.fund_id}, fund_data);
        if (fund) {
            res.send({code: 200, success: true, fund: fund, fund_id: fund_id})
        }
        res.send({code: 200, success: false, fund: fund, fund_id: fund_id})

    } catch (e) {
        res.send({success: false, message: e.message})
    }

});

const deleteFund = (async (req, res, next) => {
    try {
        var fund_id = req.params.fund_id;

        const fund = await Fund.findOneAndDelete({_id: fund_id});
        if (fund) {
            res.send({code: 200, success: true, fund: fund, fund_id: fund_id})
        }
        res.send({code: 200, success: false, fund: fund, fund_id: fund_id})

    } catch (e) {
        res.send({success: false, message: e.message})
    }

});

export default {
    getAllFunds,
    investFund,
    updateFund,
    deleteFund
}