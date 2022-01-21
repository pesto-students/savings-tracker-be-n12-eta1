import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const GoalSchema = new Schema({
                                  user_id: {
                                      type: String,
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
                                  start_date: {
                                    type: Date,
                                    required: [true, 'Start Date is required']
                                },
                                  end_date: {
                                      type: Date,
                                      required: [true, 'End Date is required']
                                  },
                              });

const User = mongoose.model('goal', GoalSchema);

export default User;