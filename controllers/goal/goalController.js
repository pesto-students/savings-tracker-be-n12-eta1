import Goals from '../../models/goal.js'
import Fund from '../../models/fund.js'

const getAllGoals =  (async(req,res,next)=>{
    try{
        var user_id = req.user_id
        const goals = await Goals.find({user_id:user_id})
        
        res.send({code: 200, success: true, goals: goals, user_id: user_id})

    } catch (e) {
        res.send({success: false, message: e.message})
    }
    
})

const goalDetails = (async(req,res,next)=>{
    try{
        var goal_id = req.query.goal_id
        const funds = await Fund.find({goal_id:goal_id})
        if(funds){
            res.send({code: 200, success: true, funds: funds, goal_id: goal_id})
        }
        res.send({code: 200, success: false, funds: funds, goal_id: goal_id})

    } catch (e) {
        res.send({success: false, message: e.message})
    }
    
})

const createGoal = (async(req,res,next)=>{
    try{
        var goal_data = {}
        var body = req.body
        goal_data.user_id = req.user_id
        goal_data.title = body.title
        goal_data.total_amount = body.total_amount||null
        goal_data.end_date = body.end_date||null
        goal_data.start_date = new Date()
        goal_data.status = body.status||'New'

        const goal = await Goals.create(goal_data)
        if(goal){
            res.send({code: 200, success: true, goal: goal, message: "goal for "+goal_data.title+" is added successfully"})
        }
        res.send({code: 200, success: false, goal: goal, message: "goal for "+goal_data.title+" is not added "})

    } catch (e) {
        res.send({success: false, message: e.message})
    }
    
})

const updateGoal = (async(req,res,next)=>{
    try{
        var goal_data = {}
        var body = req.body
        var goal_id = body.goal_id
        goal_data.goal_id = body.goal_id
        goal_data.user_id = req.user_id
        goal_data.fund_type = body.fund_type||null
        goal_data.amount = body.amount||null

        const goal = await Goals.findOneAndUpdate({goal_id:goal_data.goal_id},goal_data)
        if(goal){
            res.send({code: 200, success: true, goal: goal, goal_id: goal_id})
        }
        res.send({code: 200, success: false, goal: goal, goal_id: goal_id})

    } catch (e) {
        res.send({success: false, message: e.message})
    }
    
})

const deleteGoal = (async(req,res,next)=>{
    try{
        var goal_id = req.query.goal

        const goal = await Goals.findOneAndDelete({goal_id:req.query.fund_id})
        if(fund){
            res.send({code: 200, success: true, goal: goal, goal_id: goal_id})
        }
        res.send({code: 200, success: false, goal: goal, goal_id: goal_id})

    } catch (e) {
        res.send({success: false, message: e.message})
    }
    
})

export default {
    getAllGoals,
    createGoal,
    goalDetails,
    updateGoal,
    deleteGoal
}