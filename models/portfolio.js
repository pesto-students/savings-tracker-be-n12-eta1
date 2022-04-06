import mongoose from 'mongoose'


const PortfolioSchema = new mongoose.Schema({
                                                user_id: {
                                                    type: String,
                                                    required: [true, 'User Id field is required'],
                                                },
                                                type: {
                                                    type: String,
                                                    required: [true, 'Type is required'],
                                                    enum: ['Income', 'Expenses']
                                                },
                                                description: {
                                                    type: String,
                                                    required: [true, 'Description is required'],

                                                },
                                                frequency: {
                                                    type: String,
                                                    required: [true, 'Frequency is required'],
                                                    enum: ['Recurring', 'One Time']
                                                },
                                                frequency_type: {
                                                    type: String,
                                                    required: [false, 'Frequency is required'],
                                                    enum: ['Day', 'Week', 'Month']
                                                },
                                                frequency_unit: {
                                                    type: Number,
                                                    required: [false, 'Frequency is required'],
                                                },
                                                amount: {
                                                    type: Number,
                                                    required: [true, 'Amount is required'],

                                                },
                                                created_date: {
                                                    type: Date,
                                                    required: [true, 'Created Date is required'],

                                                },
                                                start_date: {
                                                    type: Date,
                                                    required: [true, 'Start Date is required'],

                                                },
                                                end_date: {
                                                    type: Date,
                                                    defaultValue: null,
                                                    required: [false],

                                                },


                                            });

const Portfolio = mongoose.model('portfolio', PortfolioSchema);

export default Portfolio;

