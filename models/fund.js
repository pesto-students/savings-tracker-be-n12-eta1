import mongoose from 'mongoose'

const FundSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: [true, 'User Id field is required']
        },
        goal_id: {
            type: String,
            required: [true, 'Goal Id field is required']
        },
        fund_type: {
            type: String,
            required: [false, '']
        },
        amount: {
            type: Number,
            required: [true, 'Amount field is required']
        },
        created_at: {
            type: Number,
            default: (new Date()).getTime()
        },
        updated_at: {
            type: Number,
            default: (new Date()).getTime()
        }
    });

const Fund = mongoose.model('Fund', FundSchema);

export default Fund

