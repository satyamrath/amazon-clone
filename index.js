const express = require("express");
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env"});
const stripe_sk = process.env.STRIPE_SK;
const stripe = require("stripe")(stripe_sk);

const app = express();

app.use(express.json());
// app.get("/", (req, res) => {
//   res.status(200).send("server page");
// });

app.post("/payments/create", async (req, res) => {
	const total = req.query.total;
  
	console.log("Payment Request for amount", total);
	const paymentIntent = await stripe.paymentIntents.create({
	  amount: total, // subunits of the currency
	  currency: "inr",
	});
	
	// OK - Created
	res.status(201).send({
	  clientSecret: paymentIntent.client_secret,
	});
  });



if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'));
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})