import Stripe from "stripe";
import PaymentService from "./PaymentService";

const apiKey = process.env.stripeSecretKey as string;

const stripeService = new Stripe(apiKey, {
  apiVersion: "2022-11-15",
});

const paymentService = new PaymentService(stripeService);

export default paymentService;
