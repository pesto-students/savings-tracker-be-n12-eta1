import mongoose from 'mongoose'

const SubscriptionSchema = new mongoose.Schema({
                                                   user_id: {
                                                       type: String,
                                                       required: [true],
                                                   },
                                                   razorpay_subscription_id: {
                                                       type: String,
                                                       required: [true],

                                                   },
                                                   razorpay_payment_id: {
                                                       type: String,
                                                   },
                                                   cancelled_on: {
                                                       type: Date,
                                                   },
                                                   status: {
                                                       type: String,
                                                       required: [true],
                                                       enum: ['created', 'active', 'cancelled']
                                                   },

                                               }, {timestamps: true});

const Subscription = mongoose.model('subscription', SubscriptionSchema);

export default Subscription