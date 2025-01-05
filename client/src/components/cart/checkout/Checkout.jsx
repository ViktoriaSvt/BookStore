import { useState } from "react";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createPurchase } from "../../../api/user-requests";
const stripePromise = loadStripe("pk_test_51QcrYKJdrx2Bl88hL32ynmqxBMVt2BEs8Y0iP4VAKgl99cXbjoKElZJwneSQUIULOqGDkJWvhaSQkKTmKec48gBG00k5bGosVD");

const PaymentForm = ({ totalAmount }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);



        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (error) {
            console.error(error);
            console.log('in first error');

            setIsProcessing(false);
        } else {
            const response = await createPurchase(paymentMethod, totalAmount)

            try {
                if (response) {
                    console.log("Payment successful!");
                } else {
                    console.error("Payment failed:", response.data.error);
                }
            } catch (err) {
                console.error("Error sending payment data to backend:", err);
            } finally {
                setIsProcessing(false);
            }
        }
    };

    return (
        <div className="mt-6 border-t pt-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
    <div className="shadow-lg p-6 rounded-lg bg-white">
        <div className="bg-gray-100 p-4 rounded-lg ">
            <CardElement />
        </div>
    </div>


    <div className="flex justify-between items-center px-4 py-2">
        <span className="text-xl font-semibold text-gray-800">
            Total: ${totalAmount.toFixed(2)}
        </span>

        <button
            type="submit"
            disabled={isProcessing}
            className={`px-6 py-3 text-white font-semibold rounded-lg transition-colors ${isProcessing ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
        >
            {isProcessing ? "Processing..." : "Pay Now"}
        </button>
    </div>
</form>

        </div>
    );
};

const StripePayment = ({ totalAmount }) => {
    return (
        <Elements stripe={stripePromise}>
            {console.log('entering stripe')}
            <PaymentForm
                totalAmount={totalAmount}
            />
        </Elements>
    );
};

export default StripePayment;
