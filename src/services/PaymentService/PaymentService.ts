import { Stripe } from "stripe";

type MakePayment = Stripe.ChargeCreateParams;

export default class PaymentService {
  constructor(private readonly paymentHandler: Stripe) {}

  async makePayment(payment: MakePayment): Promise<any> {
    await this.paymentHandler.charges.create(payment);
    return { status: true };
  }
}
