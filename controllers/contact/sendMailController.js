import { Validator } from 'node-input-validator'

const sendMail = (async(req,res,next)=>{
    try{

		var input = JSON.parse(JSON.stringify(req.body)); 
		console.log(req.body,input)
		const v = new Validator(req.body, {
			email: 'required',
			name: 'required',
			message: 'required'
			});
		  
		v.check().then((matched) => {
			var data = {};
			var errorData=[];
			if (!matched) {
				if(v.errors){
					for(var attributeName in v.errors){
						var field1 = String(attributeName);  
						errorData[field1] = v.errors[attributeName].message;   
						data.field1 = req.field1;
					}                            
				}         
				data = input; 
				res.send({code:200,success:false,data:errorData,message:'Your query not submitted'})
			}else{
				//var hbs = require('nodemailer-express-handlebars');
				let HelperOptions = {
										from: '"'+input.name+'" <'+input.email+'>',
										to: blogingEmail,
										subject: input.subject,
										html:'<h1>Query</h1><p>Name: '+input.name+'<br/>Email: '+input.email+'<br/>Message:'+input.message+'</p>'
										/*template: 'email/template/contact_email',
										context: {
											name:input.name,
											email: input.email,
											message: input.message
										}*/
									};
					/*smtpTransport.sendMail(HelperOptions, (error,info) => {
						if(error) {
							console.log(error);
							res.json(error);
						}
						console.log("email is send");
						console.log(info);
						//res.json(info)
						res.send({code:200,success:true,message:"Your query has been submitted,we will be in touch with you",data:'Your query has been submitted,we will be in touch with you'})
					});*/
					res.send({code:200,success:true,message:"Your query has been submitted,we will be in touch with you",data:'Your query has been submitted,we will be in touch with you'})
								
			}
		}); 
		res.send({code:200,success:false,data:'Your query not submitted',message:'Your query not submitted'})
    }catch(e){
       res.send({error:true,message:e.message}) 
    }
})

//exports.sendMail = sendMail;
export default {
    sendMail
}