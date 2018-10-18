const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema ({
    item: {type: String, required: true}
})


// const ActionItem = mongoose.model('ActionItem', ItemSchema);
module.exports = mongoose.model('ActionItem', ItemSchema);
