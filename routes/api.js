import express from 'express'
import { initializeApp } from 'firebase-admin/app';

const router = express.Router()

router.post('/', function () {
    console.log("this is test api")
});

router.post('/authenticate',verifyUser,function(req, res){
	initializeApp({
		credential: applicationDefault(),
		databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
	});

	/*const myRefreshToken = '...'; // Get refresh token from OAuth2 flow

	initializeApp({
		credential: refreshToken(myRefreshToken),
		databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
	});*/


});

async function verifyUser(req,res,next) {
	next()
}

export default router