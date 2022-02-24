import React, { useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import CardIcon from "../images/credit-card.svg";
import ProdImage from "../images/prod-img.jpg"

import "../styles.css";

let stripePromise;

const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(`${process.env.REACT_APP_KEY}`);
	}

	return stripePromise;
}

const Checkout = () => {
	const [stripeError, setStripeError] = useState(null);
	const [loading, setLoading] = useState(false);

	const  item = {
		price: "price_1KWZvNHn8cxbBtzOpKiKnCL2",
		quantity: 1,
	}

	const checkoutOptions = {
		lineItems: [item],
		mode: "payment",
		successUrl: `${window.location.origin}/success`,
		cancelUrl: `${window.location.origin}/cancel`,
	}

	const redirectToCheckout = async () => {
		setLoading(true);
		console.log("redirected to checkout");
		const stripe = await getStripe();
		const { error } = await stripe.redirectToCheckout(checkoutOptions);
		if (error) setStripeError(error.message);
		setLoading(false);
	}
	
	if (stripeError) alert(stripeError);

	return (
	<div className="checkout">
		<h1>Stripe Checkout</h1>
		<p className="checkout-title">{"I NEVER DIE"}</p>
		<p className="checkout-description">
		{"(G)I-DLE FIRST FULL ALBUM"}
		</p>
		<h1 className="checkout-price">$19.99</h1>
		<img
		className="checkout-product-image"
		src={ProdImage}
		alt="Product"
		/>
		<button disabled={loading} className="checkout-button" onClick={redirectToCheckout}>
		<div className="grey-circle">
			<div className="purple-circle">
			<img className="icon" src={CardIcon} alt="credit-card-icon" />
			</div>
		</div>
		<div className="text-container">
			<p className="text">{loading ? "Loading" : "Buy"}</p>
		</div>
		</button>
	</div>
	);
};

export default Checkout;
