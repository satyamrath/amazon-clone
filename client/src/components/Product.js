import React, { useEffect, useState } from 'react'
import './Product.css'
import { useStateValue } from './../StateProvider';

function Product({ id, title, image, price, rating }) {
	const [{ basket }, dispatch] = useStateValue();
	const [quantity, setQuantity] = useState(0);

	const addToBasket = () => {
		changeBasket(quantity + 1);
	}

	const removeFromBasket = () => {
		changeBasket(quantity - 1);
	}

	const changeBasket = (newQuantity) => {
		
		// console.log('this is the basket', basket);
		// console.log(quantity);
		// dispatch the item into the data layer
		dispatch({
			type: 'CHANGE_PRODUCT_QUANTITY',
			item: {
				id: id,
				title: title,
				image: image,
				price: price,
				rating: rating,
				quantity: newQuantity
			},
		});
	}

	useEffect(() => {
		let found = false;
		basket.forEach((item, index) => {
			if(item.id === id){
				found = true;
				setQuantity(item.quantity);
			}
			// console.log(item);
		});
		if(!found){
			setQuantity(0);
		}
		// console.log(basket);
	}, [basket, id])

	return (
		<div className="product">
			<div className="product_info">
				<p>{ title }</p>
				<p className="product_price">
					<small>₹</small>
					<strong>{ price }</strong>
				</p>
				<div className="product_rating">
					{ Array(rating).fill().map((_, i) => (
						<p>🌟</p>
					))}
				</div>
			</div>
			<img src={image} alt=""/>
			{ quantity === 0 && (<button onClick={addToBasket}>Add to Basket</button>)}
			{ quantity !== 0 &&(
				<div className="product_already_added">
					<button onClick={removeFromBasket}>-</button>
					<span style={{ 'padding': '5px'}}>{quantity}</span>
					<button onClick={addToBasket}>+</button>
				</div>
			)}
		</div>
	)
}

export default Product
