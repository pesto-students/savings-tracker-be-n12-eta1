import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
    user_id: {
        type: String,
        required: [true, 'User Id field is required'],
        unique: [true, 'User Id is already present']
    },
	name: {
        type: String,
        required: [false, 'Name field is optional']
    },
    email: {
        type: String,
        required: [false, 'Email field is optional']
    },
    phone_number: {
        type: String,
        required: [true, 'Phone field is required'],
        unique: [true, 'This phone number is already present']
    },
    dob: {
        type: String,
        required: [false, 'dob field is optional']
    },
    country: {
        type: String,
        required: [false, 'country field is optional']
    },
    city: {
        type: String,
        required: [false, 'city field is optional']
    },
    bio: {
        type: String,
        required: [false, 'bio field is optional']
    },
})

const User = mongoose.model('user',UserSchema)

export default User