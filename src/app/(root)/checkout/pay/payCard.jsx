"use client";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect,useState } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Loader from "@/components/custom/Loader";

const CheckoutForm = (clientSecret) => {
    const {address} = useSelector((state) => state.checkOut);
     const [isLoading,setIsLoading]=useState(false)
    const stripe = useStripe();
    const elements = useElements();
    const url = process.env.NEXTAUTH_URL;
    useEffect(() => {
        if (!stripe) {
            return;
        }
        if (!clientSecret) {
            return;
        }
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             setIsLoading(true)
            if (!stripe || !elements) {
                             setIsLoading(false)

                return;
            }
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: "/profile/order",
                },
            });
            if (!error) {
                setIsLoading(false)
                // If `result.error` is `null`, it's a success
                console.log(error);
                toast.success("Payment successful");
                localStorage.removeItem("clientSecret");

                // Send the paymentIntent.id to your server to create the order
            } else {
                setIsLoading(false)
                toast.error(`Something went wrong ${error}`);
                // Show error to your customer
                console.log("error occured");
            }
            localStorage.removeItem("cartItems");
            localStorage.removeItem("chekout");
        } catch (err) {
            setIsLoading(false)
            console.log(err);
        }
    };
    return (
        <div className="w-full ">
            {clientSecret ? (
                <form
                    className="shadow-lg p-3 rounded-lg md:w-[500px] w-full h-max mt-10 mx-auto"
                    onSubmit={handleSubmit}
                >
                    <PaymentElement options={{ layout: "accordion" }} />
                    <Button
                        type="submit"
                        className="bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border-2 font-semibold transition:all w-full"
                    >
                        {
                            isLoading ? <Loader isLoading={isLoading} /> : "Pay now"
                        }
                    </Button>
                </form>
            ) : null}
        </div>
    );
};
export default CheckoutForm;
