import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2';

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
                                  description: {
                                    type: String,
                                    required: [true, 'Title field is required']
                                },
                                  status: {
                                      type: String,
                                      required: [false, 'Status field is required'],
                                      default: 'active'
                                  },
                                  total_amount: {
                                      type: Number,
                                      required: [true, 'Total Amount field is required']
                                  },
                                  start_date: {
                                      type: Date,
                                      required: [true, 'Start Date is required'],
                                      default: new Date
                                  },
                                  end_date: {
                                      type: Date,
                                      required: [true, 'End Date is required']
                                  },
                              });

GoalSchema.plugin(mongoosePaginate);

const Goal = mongoose.model('goal', GoalSchema);

export default Goal;