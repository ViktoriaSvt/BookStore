import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createPurchase } from "../../../api/payments";


const stripePromise = loadStripe("pk_test_51QcrYKJdrx2Bl88hL32ynmqxBMVt2BEs8Y0iP4VAKgl99cXbjoKElZJwneSQUIULOqGDkJWvhaSQkKTmKec48gBG00k5bGosVD");

const PaymentForm = ({ totalAmount, books }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });


        try {

            const response = await createPurchase(paymentMethod, totalAmount, books)

            if (response === 'denied') {
                throw new Error("Payment denied");
            }

            toast.success("Payment succeeded", {
                position: "top-right",
            });

        } catch (err) {
            toast.error(err.message, {
                position: "top-right",
            });
        } finally {
            setIsProcessing(false);
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

const StripePayment = ({ totalAmount, books }) => {

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm
                totalAmount={totalAmount}
                books={books}
            />
        </Elements>
    );
};

export default StripePayment;
