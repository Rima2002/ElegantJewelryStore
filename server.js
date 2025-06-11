// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');

app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      // Static sample cart
      {
        price_data: {
          currency: 'usd',
          product_data: { name: 'Jewelry Order' },
          unit_amount: 10000 // Total placeholder: $100
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: 'http://localhost:4242/success.html',
    cancel_url: 'http://localhost:4242/cancel.html'
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Server running on http://localhost:4242'));