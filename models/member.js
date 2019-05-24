var mongoose = require('mongoose');

var MemberSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    salt: {
        type: String,
        required: true,
        trim: true
    },
    fullName: {
        type: String
    },
    avatarUrl: {
        type: String
    }
});
var MemberModel = mongoose.model('members', MemberSchema);
module.exports = MemberModel;