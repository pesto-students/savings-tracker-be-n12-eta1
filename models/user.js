import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema({
                                           user_id: {
                                               type: String,
                                               required: [true, 'User Id field is required'],
                                               unique: [true, 'User Id is already present']
                                           },
                                           first_name: {
                                               type: String,
                                               required: [false, ''],
                                           },
                                           last_name: {
                                               type: String,
                                               required: [false, ''],

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
                                               required: [true, 'A Valid currency is required']
                                           },
                                       });

const User = mongoose.model('user', UserSchema);

export default User

