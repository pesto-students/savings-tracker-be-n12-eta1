import Portfolio from "../../models/portfolio.js";
import User from "../../models/user.js";
import {makeErrorsArray} from "../../utils/errors.js";


const getPortfolio = (async (req, res) => {
    try {
        const user_id = req.user_id;

        const user = await User.findOne({user_id}, ['currency']);

        const portfolios = await Portfolio.find({user_id});

        if (portfolios) {

            res.send({success: true, portfolios: portfolios, currency: user.currency});

        }
        else {
            res.send({success: true, portfolios: []});

        }

    } catch (error) {

        const responseErrors = makeErrorsArray(error);
        res.statusCode = 400;

        res.send({success: false, errors: responseErrors});

    }
});
const addPortfolio = (async (req, res) => {
    try {
        const user_id = req.user_id;

        const {type, start_date, end_date, amount, frequency, description} = req.body;

        const portfolio = new Portfolio({
                                            user_id,
                                            type,
                                            start_date,
                                            end_date,
                                            amount,
                                            frequency,
                                            description,
                                            created_date: new Date
                                        });

        await portfolio.save();

        res.send({success: true, portfolio});


    } catch (error) {

        const responseErrors = makeErrorsArray(error);
        res.statusCode = 400;

        res.send({success: false, errors: responseErrors});

    }
});


const updatePortfolio = (async (req, res) => {
    try {
        const user_id = req.user_id;
        const portfolioId = req.params.portfolioId;

        const {type, start_date, end_date, amount, frequency, description} = req.body;

        const portfolio = await Portfolio.findOne({user_id, _id: portfolioId});

        if (!portfolio) {
            res.send({success: false, message: 'Not Found'});
            return;
        }

        portfolio.type = type;
        portfolio.start_date = start_date;
        portfolio.end_date = end_date;
        portfolio.amount = amount;
        portfolio.frequency = frequency;
        portfolio.description = description;

        await portfolio.save();

        res.send({success: true, portfolio});

    }
    catch (error) {

        const responseErrors = makeErrorsArray(error);
        res.statusCode = 400;

        res.send({success: false, errors: responseErrors});

    }

});

const deletePortfolio = (async (req, res) => {
    try {
        const user_id = req.user_id;
        const portfolioId = req.params.portfolioId;


        const result = await Portfolio.deleteOne({user_id, _id: portfolioId});

        if (result && result.deletedCount === 1) {
            res.send({success: true});
        }
        else {
            res.send({success: false, message: 'Not Found'});

        }


    } catch (error) {

        const responseErrors = makeErrorsArray(error);
        res.statusCode = 400;

        res.send({success: false, errors: responseErrors});

    }
});

const saveCurrency = (async (req, res) => {
    try {
        const user_id = req.user_id;

        const {currency} = req.body;

        const user = await User.findOne({user_id: user_id});

        if (user) {
            user.currency = currency;
            await user.save();

            res.send({success: true});

        }

    } catch (error) {

        const responseErrors = makeErrorsArray(error);
        res.statusCode = 400;

        res.send({success: false, errors: responseErrors});

    }
});

export default {

    getPortfolio,
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
    saveCurrency
}