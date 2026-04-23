const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    description: String,

    type: {
        type: String,
        enum: ["Lost", "Found"],   // VERY IMPORTANT (exam point)
        required: true
    },

    location: String,

    date: {
        type: Date,
        default: Date.now
    },

    contactInfo: String
});

module.exports = mongoose.model("Item", itemSchema);