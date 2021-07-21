import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
	return (
		<div className='home'>
			<div className="home_container">
				<img
					className="home_image"
					src="https://cdn.hipwallpaper.com/i/97/81/JqHfC9.jpg"
					alt=""
				/>

				<div className="home_row">
					<Product 
						id="12321341"
						title='Corsair K55 RGB Gaming Keyboard - Quiet & Satisfying LED Backlit Keys - Media Controls - Wrist Rest Included - Onboard Macro Recording (Multi-Colored)' 
						price={4000} 
						image="https://m.media-amazon.com/images/I/71gr2cDxKtL._AC_UY327_FMwebp_QL65_.jpg"
						rating={5}
					/>
					<Product
					    id="49538094"
						title='Tableware/Dinning Ware Green Apple Duck Pot 1.3L Glass Pitcher with Plastic lid,Drinking Beverage Jug,Glass Water jug for' 
						price={349} 
						image="https://m.media-amazon.com/images/I/510XfNj-4DL.jpg"
						rating={4}
					/>
				</div>
				<div className="home_row">
					<Product 
						id="3254354345"
						title='PrimeWorld Glass Whiskey Glass - 6 Pieces, Clear, 300 ml' 
						price={799} 
						image="https://m.media-amazon.com/images/I/71vsJSljvwL._AC_UL480_FMwebp_QL65_.jpg"
						rating={1}
					/>
					<Product 
						id="4903850"
						title='Infinity by Harman Fuze Pint Deep Bass Dual EQ Bluetooth 5.0 Wireless Portable Speaker (Charcoal Black)
						' 
						price={1999} 
						image="https://m.media-amazon.com/images/I/71K6mroOBJL._AC_UY327_FMwebp_QL65_.jpg"
						rating={1}
					/>
					<Product 
						id="23445930"
						title='Glassware Crystal Clear Pineapple Shaped Juice Glass Set of 6 Pieces, 150 ml Each' 
						price={369} 
						image="https://m.media-amazon.com/images/I/51fkR-PkeJL.jpg"
						rating={4}
					/>
				</div>
				<div className="home_row">
					<Product 
						id="90829332"
						title='Acer 27 Inch Full HD IPS Ultra Slim (6.6mm Thick) LCD Monitor I Frameless Design I AMD Free Sync I Eye Care Features I Stereo Speakers (HA270)' 
						price={19000} 
						image="https://m.media-amazon.com/images/I/A1J8xFZyayL._AC_UY327_FMwebp_QL65_.jpg"
						rating={4}
					/>
				</div>
			</div>
		</div>
	)
}

export default Home
