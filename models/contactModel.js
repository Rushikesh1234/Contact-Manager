const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: [true, "Please add the contact name"]
        },
        email: {
            type: String,
            required: [true, "Please add the contact email"]
        },
        phone: {
            type: String,
            required: [true, "Please add the phone number"]
        },
        birthdate: {
            type: String,
            required: [true, "Please add the contact birthdate"]
        },
    },
    {
        timestamps : true,
    }
);

module.exports = mongoose.model("Contact", contactSchema);