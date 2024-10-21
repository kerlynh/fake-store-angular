const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")(process.env.STRIPE_SECRET);

app.post("/checkout", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.product],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.API_URL}/success.html`,
      cancel_url: `${process.env.API_URL}/cancel.html`,
    });

    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
});

app.listen(4242, () => console.log("app is runing on 4242"));
