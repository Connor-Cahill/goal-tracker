const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UpdateSchema = new Schema({
    createdAt: {type: String},
    updateTitle: {type: String, required: true},
    updateContent: {type: String, required: true},
    goalId: {type: Schema.Types.ObjectId, ref: 'Goal', required: true} //--> shouldnt need this

})

UpdateSchema.pre('save', function(next) {
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const now = `${month}/${day}/${year}`
    this.createdAt = now;
    next();

})

const Update = mongoose.model('Update', UpdateSchema);
module.exports = Update;
