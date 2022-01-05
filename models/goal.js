import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
    user_id: {
        type: Number,
        required: [true, 'User ID field is required']
    },
	title: {
        type: String,
        required: [true, 'Title field is required']
    },
    status: {
        type: String,
        required: [false, 'Status field is required']
    },
    total_amount: {
        type: String,
        required: [true, 'Total Amount field is required']
    },
    end_date: {
        type: String,
        required: [true, 'End Date is required']
    },
})

const User = mongoose.model('goal',UserSchema)

export default User