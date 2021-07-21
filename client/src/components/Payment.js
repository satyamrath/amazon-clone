import React, { useState, useEffect } from 'react';
import './Payment.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './../StateProvider';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './../reducer';
import { db } from './../firebase';

function Payment() {
	const [{basket, user}, dispatch] = useStateValue();
	const history = useHistory();
	
	const stripe = useStripe();
	const elements = useElements();

	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState("");
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState("");

	useEffect(() => {
		// generate the special stripe secret which allows us to charge a customer

		const getClientSecret = async () => {
			// const response = await axios({
			// 	method: 'post',

			// 	// stripe expects the total in a currencies subunits
			// 	url: `/payments/create?total=${getBasketTotal(basket) * 100}` // if ₹10 then stripe expect ₹1000
			// })
			const url = `/payments/create?total=${getBasketTotal(basket) * 100}`; // if ₹10 then stripe expect ₹1000
			const response = await fetch(url, {
				method: "POST"
			});
			// console.log('response' + response);
			const data = await response.json();
			// console.log(data);
			// console.log(data.clientSecret);
			setClientSecret(data.clientSecret)
		}

		getClientSecret();
	}, [basket]);

	useEffect(() => {
		if(!user){
			alert('user should be logged in!');
			history.push('/login');
		}
	}, [user]);

	// console.log('The SECRET is >>> ', clientSecret);

	const handleSubmit = async (event) => {
		// do all the fancy stripe stuff...
		event.preventDefault();
		setProcessing(true);

		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement)
			}
		}).then(({ paymentIntent }) => {
			// paymentIntent = payment confirmination

			db
				.collection('users')
				.doc(user?.uid)
				.collection('orders')
				.doc(paymentIntent.id)
				.set(({
					basket: basket,
					amount: paymentIntent.amount,
					created: paymentIntent.created
				}))
			
			setSucceeded(true);
			setError(null);
			setProcessing(false);

			dispatch({
				type: 'EMPTY_BASKET'
			})
			history.replace('/orders')
		}).catch(err => {
			alert(err.message);
		})
	}

	const handleChange = (event) => {
		// Listen for changes in the CardElement
		// and display any errors as the customer types their card details
		setDisabled(event.empty);
		setError(event.error?event.error.message: "");
	}

	useEffect(() => {
		const totalCost = getBasketTotal(basket);
		if(totalCost === 0){
			setError('Payment should be minimum of ₹1');
		}
	}, [basket]);

	return (
		<div className="payment">
			<div className="payment_container">
				<h1>
					Checkout (<Link to="/checkout">{ basket?.length } items</Link>)
				</h1>
				{/* Payment section - delivery address */}
				<div className="payment_section">
					<div className="payment_title">
						<h3>Delivery Address</h3>
					</div>
					<div className="payment_address">
						<p>{ user?.email }</p>
						<p>House No., Locality</p>
						<p>City, State</p>
					</div>
				</div>

				{/* Payment section - Review Items */}
				<div className="payment_section">
					<div className="payment_title">
						<h3>Review items and delivery</h3>
					</div>
					<div className="payment_items">
						{basket.map(item => (
							<CheckoutProduct 
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
								quantity={item.quantity}
								hideButton={true}
							/>
						))}
					</div>

				</div>
				
				{/* Payment section - Payment method */}
				<div className="payment_section">
					<div className="payment_title">
						<h3>Payment Method</h3>
					</div>
					<div className="payment_details">
						
						{/* Stripe magic will go */}

						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />

							<div className="payment_priceContainer">
								<CurrencyFormat
									renderText={(value) => (
										<h3>Order Total: {value}</h3>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"₹"}
								/>
								<button disabled={processing || disabled || succeeded}>
									<span>{processing? <p>Processing</p>: "Buy Now"}</span>
								</button>
							</div>

							{/* Errors */}
							{ error && (<div>{ error }</div>)}
						</form>

						<h3 className="payment_disclaimer"><b>Warning:</b> Make Transactions at your own risk.</h3>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Payment
