import Stripe from "stripe";
import { paymentModel } from "../../DB/models/payment.model.js";
import { invoiceModel } from "../../DB/models/invoice.model.js";
import { clientModel } from "../../DB/models/clients.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 1. إنشاء Checkout Session
export const createCheckoutSession = async (data) => {
  const { invoice_id, installment_id, customer_id } = data;

  // جيب الفاتورة الأصلية
  const invoice = await invoiceModel.findById(invoice_id);
  if (!invoice) throw new Error("Invoice not found");

  // جيب الـ Client
  const client = await clientModel.findById(customer_id);
  if (!client) throw new Error("Client not found");

  // جيب القسط المطلوب
  const installment = client.installments.id(installment_id);
  if (!installment) throw new Error("Installment not found");
  if (installment.status === "PAID") throw new Error("Installment already paid");

  // إنشاء Stripe Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "egp",
          product_data: {
            name: `قسط عقار - ${invoice.invoiceNumber}`,
          },
          unit_amount: installment.amount * 100, // Stripe بيشتغل بالقروش
        },
        quantity: 1,
      },
    ],
    metadata: {
      invoice_id: invoice_id.toString(),
      customer_id: customer_id.toString(),
      installment_id: installment_id.toString(),
      property_id: invoice.property_id.toString(),
    },
    success_url: `${process.env.FRONTEND_URL}/payment/success`,
    cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
  });

  return { url: session.url, sessionId: session.id };
};

// 2. Stripe Webhook
export const handleWebhook = async (rawBody, signature) => {
    console.log("Webhook called");
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    throw new Error(`Webhook signature failed: ${err.message}`);
  }

  // لو الدفع نجح
  if (event.type === "checkout.session.completed") {
      console.log("checkout.session.completed");
    const session = event.data.object;
    
    await processSuccessfulPayment(session);

  }

  return { received: true };
};


// 3. معالجة الدفع الناجح

const processSuccessfulPayment = async (session) => {
  
  const { invoice_id, customer_id, installment_id, property_id } = session.metadata;
  const amount = session.amount_total / 100; // رجّع من قروش لجنيه

  // جيب الفاتورة الأصلية
  const invoice = await invoiceModel.findById(invoice_id);
  if (!invoice) throw new Error("Invoice not found");

  // جيب الـ Client
  const client = await clientModel.findById(customer_id);
  if (!client) throw new Error("Client not found");

  // تحديث القسط → PAID
  const installment = client.installments.id(installment_id);
  installment.status = "PAID";
  installment.paidAt = new Date();
  await client.save();

  // تسجيل Payment record
  await paymentModel.create({
    invoice_id,
    customer_id,
    property_id,
    installment_id,
    amount,
    paymentMethod: "STRIPE",
    transactionId: session.payment_intent,
    status: "SUCCESS",
    paidAt: new Date(),
  });

  // إنشاء فاتورة جديدة للقسط
  const count = await invoiceModel.countDocuments();
  await invoiceModel.create({
    invoiceNumber: `INV-${String(count + 1).padStart(5, "0")}`,
    customer_id,
    property_id,
    paymentType: "INSTALLMENT",
    parentInvoice_id: invoice_id,
    installment_id,
    basePrice: amount,
    totalAmount: amount,
    paidAmount: amount,
    remainingAmount: 0,
    status: "PAID",
  });

  // تحديث الفاتورة الأصلية
  const newPaidAmount = invoice.paidAmount + amount;
  const newRemainingAmount = invoice.remainingAmount - amount;
  const newStatus = newRemainingAmount <= 0 ? "PAID" : "PARTIAL";

  await invoiceModel.findByIdAndUpdate(invoice_id, {
    paidAmount: newPaidAmount,
    remainingAmount: newRemainingAmount,
    status: newStatus,
  });
};

// 4. جلب الدفعات
export const getAllPayments = async () => {
  return await paymentModel
    .find()
    .populate("invoice_id")
    .populate("customer_id")
    .populate("property_id");
};

export const getPaymentById = async (id) => {
  const payment = await paymentModel
    .findById(id)
    .populate("invoice_id")
    .populate("customer_id")
    .populate("property_id");

  if (!payment) throw new Error("Payment not found");
  return payment;
};