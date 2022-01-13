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

const saveMobile = (async(req,res)=>{
    try{
        console.log("save mobile")
		//do email send work
		var input = JSON.parse(JSON.stringify(req.body)); 
		var phone_number =  JSON.stringify(input.phone_number); 
        var uid =  JSON.stringify(input.uid);
        var aud =  JSON.stringify(input.aud);
        var iss =  JSON.stringify(input.iss);
        /*if(aud===process.env.FIREBASE_CREDENTIAL_PROJECT_ID && 
           uid===process.env.FIREBASE_CREDENTIAL_PROJECT_ID &&
           uid===process.env.FIREBASE_CREDENTIAL_PROJECT_ID ){

            }*/

		Users.findOne({phone_number: phone_number}).then(function(user){
            user.returning_user = true
            res.send({code:200,success:true,user:user})
        }).catch(next);

        Users.create({phone_number:phone_number}).then(function(user){
            user.new_user = true
            res.send({code:200,success:true,user:user})
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