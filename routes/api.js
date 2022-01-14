import express from 'express'
<<<<<<< HEAD
=======
import { initializeApp } from 'firebase-admin/app';
>>>>>>> f614df97e2ae66f4b8b1e567dbfcbbec250f3ab6

const router = express.Router()

router.post('/', function () {
    console.log("this is test api")
});
<<<<<<< HEAD
=======

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
>>>>>>> f614df97e2ae66f4b8b1e567dbfcbbec250f3ab6

export default router