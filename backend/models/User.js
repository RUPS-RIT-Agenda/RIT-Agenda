
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20,
    },

    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        min: 4,
    },

    dateOfBirth: {
        type: Date,
        required: false,
    },
    studyCycle: {
        type: String,
        enum: ["UNI", "MAG"],
        required: true,
    },

    schoolYear: {
        type: Number,
        min: 1,
        max: 3,
        required: true,
    },

    userGroup: {
        type: Number,
        required: true,
    },

    userEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomEvent",
    }],



});

const User = mongoose.model("User", UserSchema);
export default User;