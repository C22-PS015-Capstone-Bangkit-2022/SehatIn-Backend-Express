const { v4: uuidv4 } = require("uuid");
const snap = require("../config/midtrans");

exports.snap = (req, res) => {
  let orderId = uuidv4();
  // let parameter = {
  //   transaction_details: {
  //     order_id: orderId,
  //     gross_amount: req.body.totalPrice,
  //   },
  //   item_details: [
  //     {
  //       id: req.body.idItem,
  //       price: req.body.price,
  //       quantity: req.body.jumlah,
  //       name: req.body.namaItem,
  //       category: "doctor consultation",
  //       merchant_name: "SehatIn",
  //     },
  //   ],
  //   customer_details: {
  //     first_name: req.body.name,
  //     email: req.body.userEmail,
  //   },
  //   custom_field1: req.body.userId,
  //   enabled_payments: ["gopay", "shopeepay"],
  // };

  snap
    .createTransaction(req.body)
    .then((transaction) => {
      // transaction token
      let transactionToken = transaction.token;

      // transaction redirect url
      let transactionRedirectUrl = transaction.redirect_url;
      //console.log("transactionRedirectUrl:", transactionRedirectUrl);
      let transaksi = {
        token: transaction.token,
        redirectUrl: transaction.redirect_url,
      };
      res.send(transaksi);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Failed to get transaction token.",
      });
      console.log("[Transaction Token] Error occurred:", err.message);
    });
};
