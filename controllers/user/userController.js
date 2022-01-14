import Users from '../../models/user.js'

const getUsers = (async(req,res)=>{
    try{
        Users.find({}).then(function(users){
            res.send({code:200,success:true,user:user})
        }).catch(next)
    }catch(e){
        res.send({error:true,message:e.message}) 
     }
 })

const saveMobile = (async(req,res,next)=>{
    try{
		//do email send work
		var user_id = JSON.parse(JSON.stringify(req.user_id)); 
		var phone_number =  JSON.parse(JSON.stringify(req.phone_number)); 
        console.log(user_id,phone_number)
		Users.findOne({_id: user_id}).then(function(user){
            if(user==null){
                Users.create({_id:user_id,phone_number:phone_number}).then(function(user){
                    res.send({code:200,success:true,user:user,returning_user:false})
                }).catch(next);
            }
            res.send({code:200,success:true,user:user,returning_user:true})
        }).catch(next);

        
		
    }catch(e){
       res.send({error:true,message:e.message}) 
    }
})

//exports.sendMail = sendMail;
export default {
    getUsers,
    saveMobile
}