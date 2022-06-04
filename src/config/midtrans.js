const midtransClient = require("midtrans-client");
let serverKey = "";
let snap = new midtransClient.Snap();
const forceProduction = false;
if (process.env.NODE_ENV !== "production" && !forceProduction) {
  //sandbox
  serverKey = process.env.MIDTRANS_SB_SERVER_KEY;
  snap.apiConfig.isProduction = false;
  snap.apiConfig.serverKey = serverKey;
  snap.apiConfig.clientKey = process.env.MIDTRANS_SB_CLIENT_KEY;
} else {
  //production
  serverKey = process.env.MIDTRANS_PROD_SERVER_KEY;
  snap.apiConfig.isProduction = true;
  snap.apiConfig.serverKey = serverKey;
  snap.apiConfig.clientKey = process.env.MIDTRANS_PROD_SERVER_KEY;
}

//export const midtransServerKey = serverKey;
module.exports = snap;
