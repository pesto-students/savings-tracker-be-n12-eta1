import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
                                           user_id: {
                                               type: String,
                                               required: [false, 'User ID is optional']
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
                                               type: Date,
                                               required: [false, 'Date of Birth must be a valid Date.']
                                           },
                                           country: {
                                               type: String,
                                               required: [false, 'Country field is optional']
                                           },
                                           city: {
                                               type: String,
                                               required: [false, 'City field is optional']
                                           },
                                           bio: {
                                               type: String,
                                               required: [false],
                                               maxLength: [300, 'Bio field cannot be more than 300 characters.']
                                           },
                                           currency: {
                                               type: String,
                                               required: [false, 'A Valid currency is required']
                                           },
                                           subscription_active: {
                                               type: Boolean,
                                               default: false
                                           }
                                       });


const User = mongoose.model('user', UserSchema);

export default User

