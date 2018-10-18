const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema ({
    item: {type: String, required: true},
    goalId: {type: Schema.Types.ObjectId, ref: 'Goal', required: true}
})


// const ActionItem = mongoose.model('ActionItem', ItemSchema);
module.exports = mongoose.model('ActionItem', ItemSchema);
