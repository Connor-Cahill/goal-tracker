const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    createdAt: {type: Date},
    updatedAt: {type: Date},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    goals: [{type: Schema.Types.ObjectId, ref: 'Goal'}]
})

UserSchema.pre('save', function(next) {
    const now = new Date();
    this.updateAt = now;
    if (! this.createdAt){
        this.createdAt = now;
    }
    next();
})

///Generate Hash for password
UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//Compare Password to has method
UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}


const User = mongoose.model('User', UserSchema);
module.exports = User;
