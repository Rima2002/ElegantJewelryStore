# 💎 Elegant Jewelry Store

Welcome to the **Elegant Jewelry Store** – a modern, sleek, and fully functional online storefront built with HTML, CSS, JavaScript, and Node.js. This project demonstrates an interactive front end and a working payment integration using **Stripe Checkout**.

---

## 🛍 Features

- Stylish and responsive UI with product filtering and search.
- Shopping cart system using local storage.
- Stripe-powered checkout for secure payments.
- Dynamic success and cancel pages.
- Background video for visual appeal.
- Node.js + Express backend to handle checkout session creation.

---

## 📸 Screenshots

### 🖼 Home Page
*(Insert screenshot here)*

### 🛒 Cart Page
*(Insert screenshot here)*

### 💳 Stripe Checkout
*(Insert screenshot here)*

### ✅ Success Page
*(Insert screenshot here)*

---

## 🧾 Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js with Express
- **Payment**: Stripe API
- **Media**: Embedded video background (`jewelry.mp4`)

---

## 💳 Stripe Integration

This project uses Stripe’s **Checkout Sessions** to handle secure payments. Here's how it works:

### Backend (`server.js`)

```js
require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: 'Jewelry Order' },
          unit_amount: 10000 // $100 as placeholder
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
