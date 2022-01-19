import path from 'path'
import express, {json} from "express";
import mongoose from 'mongoose'

import userRoutes from './routes/userRoutes.js'
import portfolioRoutes from './routes/portfolioRoutes.js'
import goalsRoutes from './routes/goalRoutes.js'
import fundsRoutes from './routes/fundRoutes.js'
import nodemailer from "nodemailer"

import cors from 'cors';

import authMiddleware from './middlewares/auth.js';


global.smtpTransport = nodemailer.createTransport({
                                                      host: 'smtp.gmail.com',
                                                      port: 587,
                                                      secure: false,
                                                      auth: {
                                                          user: process.env.EMAIL_ID,
                                                          pass: process.env.EMAIL_PASSWORD
                                                      }
                                                  });


/*const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
const smsKey = process.env.SMS_SECRET_KEY;*/

const PORT = process.env.PORT || 5000;


const app = express();

app.use(cors());
// connect to mongodb

mongoose.connect(process.env.MONGO_URL);
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(express.json());

//PAYMENT STATUS
global.TRIAL = 1;
global.PAID = 2;
global.TRIAL_EXPIRED = 3;
global.LICENSEEXPIRED = 4;


global.frontendURL = 'http://localhost:' + PORT;
global.backendURL = 'http://localhost:' + PORT;

global.frontendURL = 'https://saving-tracker-backend.herokuapp.com/';
global.backendURL = 'https://saving-tracker-backend.herokuapp.com/';

/*app.use(function (req, res, next) {
>>>>>>> Stashed changes
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    //res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});*/


app.use('/api/goals', authMiddleware, goalsRoutes);

app.use('/api/users/portfolio', authMiddleware, portfolioRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/funds', authMiddleware, fundsRoutes);


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
    res.send('API is running....')
});

/*app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)*/

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);

}); 
