import mongoose from "mongoose";

const CustomEventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    description: {
        type: String,
        maxlength: 500,
    },
    starttime: {
        type: Date,
        required: true,
    },
    endtime: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        maxlength: 200,
    },
});

const CustomEvent = mongoose.model("CustomEvent", CustomEventSchema);
export default CustomEvent;
