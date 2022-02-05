import User from '../../models/user.js'
import Goals from '../../models/goal.js'
import {makeErrorsArray} from "../../utils/errors.js";
import Portfolio from '../../models/portfolio.js';

const getStatus = (async (req, res, next) => {
    try {

        const user_id = req.user_id;
        const phone_number = req.phone_number;
        let user = await User.findOne({user_id: user_id});
        if (user) {
            res.send({code: 200, success: true, user: user, returning_user: true});
        } else {
            user = await User.create({user_id: user_id, phone_number: phone_number});
            res.send({code: 200, success: true, returning_user: false});
        }
    } catch (e) {
        res.send({success: false, message: e.message})
    }
});

const onboarding = (async (req, res) => {
    try {
        const user_id = req.user_id;

        const {first_name, last_name, email, dob, country, city, bio, currency, monthly_expenses, monthly_income} = req.body;

        const user = await User.findOne({user_id: user_id});

        //todo check if already done

        if (user) {
            user.first_name = first_name;
            user.last_name = last_name;
            user.email = email;
            user.dob = dob;
            user.city = city;
            user.country = country;
            user.bio = bio;
            user.currency = currency;
            await user.save();

            if (monthly_income && !isNaN(monthly_income)) {
                const incomePortfolio = new Portfolio({
                                                          user_id,
                                                          type: 'Income',
                                                          start_date: new Date,
                                                          amount: monthly_income,
                                                          frequency: 'Recurring',
                                                          frequency_type: 'Month',
                                                          frequency_unit: 1,
                                                          description: 'Monthly Income',
                                                          created_date: new Date
                                                      });

                await incomePortfolio.save();
            }

            if (monthly_expenses && !isNaN(monthly_expenses)) {
                const expensesPortfolio = new Portfolio({
                                                            user_id,
                                                            type: 'Expenses',
                                                            start_date: new Date,
                                                            amount: monthly_expenses,
                                                            frequency: 'Recurring',
                                                            frequency_type: 'Month',
                                                            frequency_unit: 1,
                                                            description: 'Monthly Expenses',
                                                            created_date: new Date
                                                        });

                await expensesPortfolio.save();
            }


            res.send({success: true});

        }

    } catch (e) {
        res.send({success: false, message: e.message})
    }
});


const getProfile = (async (req, res) => {
    try {
        const user_id = req.user_id;

        const user = await User.findOne({user_id: user_id}, ['first_name', 'last_name', 'email', 'phone_number', 'dob', 'country', 'city', 'bio']);

        if (user) {

            res.send({success: true, user: user});

        }

    } catch (e) {
        res.send({success: false, message: e.message})
    }
});

const saveProfile = (async (req, res, next) => {
    try {
        const user_id = req.user_id;

        const {first_name, last_name, email, dob, country, city, bio} = req.body;

        const user = await User.findOne({user_id: user_id});

        if (user) {
            user.first_name = first_name;
            user.last_name = last_name;
            user.email = email;
            user.dob = dob;
            user.city = city;
            user.country = country;
            user.bio = bio;

            try {

                await user.save();

                res.send({success: true});

            }
            catch (error) {

                const responseErrors = makeErrorsArray(error);
                res.statusCode = 400;

                res.send({success: false, errors: responseErrors});

            }


        }

    } catch (e) {
        res.send({success: false, message: e.message})
    }
});

const getDashboardData = (async (req, res, next) => {
    try {
        const user_id = req.user_id
        var body = req.body || {}
        var dashboard = {}
        var goals = [
            {_id:"Recent",count:0},
            {_id:"Active",count:0},
            {_id:"Achieved",count:0}
        ]
        const status_goals = await Goals.aggregate([
            {
                $match: { user_id: {$in:[user_id]} }
            },
            {
                $group:
                {
                    _id: "$status" ,
                    count:{$sum:1}
                },  
                
                  
            }
        ])
        goals = Object.assign(goals,status_goals)
        const user = await User.findOne({user_id}, ['currency']);
        if(typeof body.start_date!=='undefined'){
            var start_date = body.start_date;
        }else{
            var d = new Date()
            var start_date = d.setMonth(d.getMonth() - 1);
        }

        if(typeof body.end_date!=='undefined'){
            var end_date = body.end_date;
        }else{
            var end_date=  new Date()
            end_date = end_date.setMonth(end_date.getMonth())
        }
        
        dashboard.start_date = start_date
        dashboard.end_date = end_date
        
        const portfolio = await Portfolio.findOne({user_id: user_id, frequency: 'One Time'})
        const incomes = await Portfolio.find({
                                                 user_id: user_id,
                                                 type: 'Income',
                                                 //frequency: {$ne: 'One Time'},
                                                 start_date: {$gte: start_date}
                                             })
        const expenses = await Portfolio.find({
                                                  user_id: user_id,
                                                  type: 'Expenses',
                                                  //frequency: {$ne: 'One Time'},
                                                  start_date: {$gte: start_date}
                                              })
        var income_graph = []
        var expense_graph = []
        var graphDate = []
        income_graph[0] = 'Incomes'
        expense_graph[0] = 'Expenses'
        graphDate[0] = 'Dates'
        var date;

        for (var i = 0; i < incomes.length; i++) {
            if (typeof incomes[i] !== 'undefined'){
                date = incomes[i].start_date.toLocaleDateString()
                income_graph[i + 1] = (date, incomes[i].amount);
                graphDate[i+1] = date
            }
                
        }

        for (var e = 0; e < expenses.length; e++) {
            if (typeof expenses[e] !== 'undefined'){
                date = expenses[e].start_date.toLocaleDateString()
                expense_graph[e + 1] = (date, expenses[e].amount);
                graphDate[e+1] = date
            }
                
        }
        dashboard.chart_data = [income_graph, expense_graph]
        dashboard.goals = goals
        dashboard.salary = (portfolio)?portfolio.amount:0;
        res.send({code: 200, success: true, dashboard: dashboard,currency:user.currency});

    } catch (e) {
        res.send({success: false, message: e.message})
    }

})


//exports.sendMail = sendMail;
export default {
    onboarding,
    getStatus,
    getProfile,
    saveProfile,
    getDashboardData
}