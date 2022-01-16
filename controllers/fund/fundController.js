import Fund from '../../models/fund.js'

const getAllFunds =  (async(req,res,next)=>{
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

const investFund = (async(req,res,next)=>{
    try{
        var goal_id = req.query.goal_id
        var fund_data = {}
        var body = req.body
        fund_data.goal_id = goal_id
        fund_data.user_id = req.user_id
        fund_data.fund_type = body.fund_type||null
        fund_data.amount = body.amount||null

        const funds = await Fund.create(fund_data)
        if(funds){
            res.send({code: 200, success: true, funds: funds, goal_id: goal_id})
        }
        res.send({code: 200, success: false, funds: funds, goal_id: goal_id})

    } catch (e) {
        res.send({success: false, message: e.message})
    }
    
})

const updateFund = (async(req,res,next)=>{
    try{
        var fund_data = {}
        var body = req.body
        fund_data.goal_id = req.query.goal_id
        fund_data.user_id = req.user_id
        fund_data.fund_type = body.fund_type||null
        fund_data.amount = body.amount||null

        const fund = await Fund.findOneAndUpdate({fund_id:req.query.fund_id},fund_data)
        if(fund){
            res.send({code: 200, success: true, fund: fund, fund_id: fund_id})
        }
        res.send({code: 200, success: false, fund: fund, fund_id: fund_id})

    } catch (e) {
        res.send({success: false, message: e.message})
    }
    
})
const deleteFund = (async(req,res,next)=>{
    try{
        var fund_id = req.query.fund_id

        const fund = await Fund.findOneAndDelete({fund_id:req.query.fund_id})
        if(fund){
            res.send({code: 200, success: true, fund: fund, fund_id: fund_id})
        }
        res.send({code: 200, success: false, fund: fund, fund_id: fund_id})

    } catch (e) {
        res.send({success: false, message: e.message})
    }
    
})

export default {
    getAllFunds,
    investFund,
    updateFund,
    deleteFund
}