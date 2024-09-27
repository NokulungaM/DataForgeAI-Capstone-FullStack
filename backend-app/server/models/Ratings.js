const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1, max: 5
    },

});

const Ratings = mongoose.model("Ratings", ratingSchema);