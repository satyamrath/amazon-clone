import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter , Switch, Route } from 'react-router-dom';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import Payment from './components/Payment';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import Orders from './components/Orders';

const promise = loadStripe('pk_test_51ITpopLHUsrmJhHRcdR5xNL58q0DICvkYKqDeU7S9tNJaBXJgxLZ1qa2MvWfg2aEnkDrn4OIzdKiLwP4fy30rjHX00Ilczzz8Y');

function App() {
	const [{}, dispatch] = useStateValue();

	useEffect (() => {
		// will only run once the app component loads...
		auth.onAuthStateChanged(authUser => {
			// console.log('the user is >> ', authUser);
			if(authUser){
				// the user just logged in/ the user was logged in
				dispatch({
					type: 'SET_USER',
					user: authUser
				})
			}else{
				// the user is logged out
				dispatch({
					type: 'SET_USER',
					user: null
				})
			}
		});
	}, []);

	return (
		// BEM
		<BrowserRouter>
			<div className="app">
				<Switch>
					<Route path='/orders'>
						<Header />
						<Orders />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/register'>
						<Register />
					</Route>
					<Route path='/checkout'>
						<Header />
						<Checkout />
					</Route>
					<Route path='/payment'>
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>
					<Route path='/'>
						<Header />
						<Home />
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
