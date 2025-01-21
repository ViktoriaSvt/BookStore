const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    paymentIntentId: { type: String, required: true },
    paymentStatus: { type: String, enum: ["succeeded", "denied", "pending"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
    bookTitles: { type:Array, required: true}
});

const PaymentModel = mongoose.model("Payment", paymentSchema);

module.exports = { PaymentModel };