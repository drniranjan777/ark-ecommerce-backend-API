// utils/razorpay.js
const Razorpay = require("razorpay");
const crypto = require("crypto");

// --- 1. INIT FUNCTION ---
const initRazorpay = (apiKey, secret) => {
  if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
    throw new Error("RazorPayGateway: apiKey is required and cannot be empty.");
  }
  if (!secret || typeof secret !== "string" || secret.trim() === "") {
    throw new Error("RazorPayGateway: secret is required and cannot be empty.");
  }

  return new Razorpay({
    key_id: apiKey,
    key_secret: secret,
  });
}

const razorpayClient = initRazorpay(
  process.env.SETTINGS_PAYMENT_GATEWAY_KEY,
  process.env.SETTINGS_PAYMENT_GATEWAY_SECRET
);

// --- 2. CREATE ORDER ---
async function createRazorpayOrder(amount, orderId, databaseId, extraComments) {
  const options = {
    amount: Math.round(amount * 100),
    currency: "INR",
    receipt: orderId,
    notes: {
      user_info: extraComments,
      db_id: databaseId,
    },
  };

  const order = await razorpayClient.orders.create(options);

  return {
    razorpayOrderId: order.id,
    reference: order.id,
    paid: order.amount_paid / 100,
    due: order.amount_due / 100,
  };
}

// --- 3. VERIFY PAYMENT ---
function verifyRazorpaySignature({
   razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) {
  const data = `${razorpay_order_id}|${razorpay_payment_id}`;

  const digest = crypto
    .createHmac("sha256", process.env.SETTINGS_PAYMENT_GATEWAY_SECRET)
    .update(data)
    .digest("hex");

  return digest === razorpay_signature;
}

module.exports = {
  razorpayClient,
  createRazorpayOrder,
  verifyRazorpaySignature,
};
