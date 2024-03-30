const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name"],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "please provide an email"],
        validate: {
            validator: validator.isEmail,
            message: 'please enter a valid email'
        }
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },

    verificationToken: String,

    isVerified: {
        type: Boolean,
        default: false,
    },

    verified: Date
})

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (thePassword) {
    const isMatch = await bcrypt.compare(thePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)