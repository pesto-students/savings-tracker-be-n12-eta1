import mongoose from 'mongoose'

const SubscriptionSchema = new mongoose.Schema({
                                                   user_id: {
                                                       type: String,
                                                       required: [true],
                                                   },
                                                   amount: {
                                                       type: Number,
                                                       required: [true],

                                                   },
                                                   razorpay_subscription_id: {
                                                       type: String,
                                                       required: [true],
                                                   },
                                                   payments: [{
                                                       id: String,
                                                       amount: Number,
                                                       currency: String,
                                                       invoice_id: String,
                                                       order_id: String,
                                                       created_at: Date
                                                   }],
                                                   paid_on: {
                                                       type: Date,
                                                   },
                                                   cancelled_on: {
                                                       type: Date,
                                                   },
                                                   status: {
                                                       type: String,
                                                       required: [true],
                                                       enum: ['created', 'active', 'cancelled', 'halted']
                                                   },

                                               }, {timestamps: true});

const Subscription = mongoose.model('subscription', SubscriptionSchema);

export default Subscription