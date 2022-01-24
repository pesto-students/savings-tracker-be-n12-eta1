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

        if (user) {
            user.first_name = first_name;
            user.last_name = last_name;
            user.email = email;
            user.dob = dob;
            user.city = city;
            user.country = country;
            user.bio = bio;
            user.currency = currency;
            user.monthly_expenses = monthly_expenses;
            user.monthly_income = monthly_income;

            await user.save();

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

const getDashboardData = (async(req,res,next)=>{
    try{
        const user_id = req.user_id
        var dashboard = {}
        const goals = await Goals.aggregate([
            {
                $group:
                {
                    _id: "$status" ,
                    count:{$sum:1}
                },  
                
                  
            }/*,{
                $match: { "user_id": user_id }
            }*/
        ])//.match({ user_id: user_id })
        //const goals = await Goals.find({user_id:user_id})
        var end_data=  new Date()
        var d = new Date()
        var start_date = d.setMonth(d.getMonth() - 1);
        const portfolio = await Portfolio.findOne({user_id:user_id,frequency:'One Time'})
        const incomes = await Portfolio.find({user_id:user_id,type:'Income',frequency: { $ne: 'One Time' },start_date: { $gte: start_date }})
        const expenses = await Portfolio.find({user_id:user_id,type:'Expenses',frequency: { $ne: 'One Time' },start_date: { $gte: start_date }})
        var income_graph = [] 
        var expense_graph = []
        income_graph[0] = 'Incomes'
        expense_graph[0] = 'Expenses'

        for(var i =0;i<incomes.length;i++){
            if(typeof incomes[i]!=='undefined')
                income_graph[i+1]  = (incomes[i].start_date.toLocaleDateString(),incomes[i].amount);
        }

        for(var e =0;e<expenses.length;e++){
            if(typeof expenses[e]!=='undefined')
                expense_graph[e+1]=(expenses[e].start_date.toLocaleDateString(),expenses[e].amount);
        }
        dashboard.chart_data=  [income_graph,expense_graph ]
        dashboard.goals = goals
        dashboard.salary = (portfolio)?portfolio.amount:0;
        res.send({code: 200, success: true, dashboard: dashboard});

    }catch(e){
        res.send({success:false,message:e.message})
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