export const initialState = {
	basket: [],
	user: null
};
  
// Selector
export const getBasketTotal = (basket) => 
	basket?.reduce((amount, item) => item.price * item.quantity + amount, 0);

const reducer = (state, action) => {
	// console.log(action);
	switch (action.type) {

		case "CHANGE_PRODUCT_QUANTITY":
			const index = state.basket.findIndex(
				(basketItem) => basketItem.id === action.item.id
			);

			if(index >= 0){ // product is already available
				let newBasket = [...state.basket];
				if(action.item.quantity){ // new quantity is greater than 0
					newBasket[index] = action.item;
				}else{// new quantity is 0
					// console.log('index inside newBasket', index);
					if(newBasket.length-1 === index) {
						newBasket.pop();
					}else {
						newBasket.splice(index, 1);
					}
				}

				return {
					...state,
					basket: newBasket
				}
			}else{// product is not available in basket
				if(action.item.quantity){
					return {
						...state,
						basket: [...state.basket, action.item],
					};
				}
			}
			return state;

		
		case 'EMPTY_BASKET':
			return {
				...state,
				basket: []
			}

		case "REMOVE_FROM_BASKET":
			const ind = state.basket.findIndex(
				(basketItem) => basketItem.id === action.id
			);
			let newBasket = [...state.basket];

			if (ind >= 0) {
				newBasket.splice(ind, 1);

			} else {
				console.warn(
				`Cant remove product (id: ${action.id}) as its not in basket!`
				)
			}

			return {
				...state,
				basket: newBasket
			}
		
		case "SET_USER":
			return {
				...state,
				user: action.user
			}

		default:
			return state;
	}
};

export default reducer;