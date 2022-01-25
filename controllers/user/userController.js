import User from '../../models/user.js'
import {makeErrorsArray} from "../../utils/errors.js";

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


//exports.sendMail = sendMail;
export default {
    onboarding,
    getStatus,
    getProfile,
    saveProfile

}