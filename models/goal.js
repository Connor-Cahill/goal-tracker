const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalSchema = new Schema ({
    createdAt: {type: String},
    title: {type: String, required: true},
    type: {type: String, required: true},
    description: {type: String, required: true},
    actionItems: [{type: Schema.Types.ObjectId, ref: 'ActionItem'}],
    updates: [{type: Schema.Types.ObjectId, ref: 'Update'}]
})

GoalSchema.pre('save', function(next) {
    //setup createdAt
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const now = `${month}/${day}/${year}`
    this.createdAt = now;
    next();
})


const Goal = mongoose.model('Goal', GoalSchema);
module.exports = Goal;
