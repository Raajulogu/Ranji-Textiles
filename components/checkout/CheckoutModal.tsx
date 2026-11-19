"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { STORE_CONFIG } from "@/data/config";
import confetti from "canvas-confetti";
import {
  X,
  CreditCard,
  QrCode,
  Building2,
  CheckCircle2,
  AlertCircle,
  Lock,
  ArrowRight,
  Truck,
  RotateCcw,
  MessageCircle,
  ShieldCheck,
  Loader2,
  ShoppingBag,
} from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CustomerFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  companyName?: string;
  gstNumber?: string;
  notes?: string;
}

type PaymentMethod = "upi" | "card" | "netbanking" | "bank_transfer";
type CheckoutStep = "details" | "payment" | "processing" | "success" | "failed";

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, subtotal, shippingFee, finalTotal, totalQuantity, clearCart } = useCart();

  const [step, setStep] = useState<CheckoutStep>("details");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState<CustomerFormData>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "Tamil Nadu",
    pincode: "",
    companyName: "",
    gstNumber: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerFormData, string>>>({});

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CustomerFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateDetails = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerFormData, string>> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit Indian phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.address.trim()) newErrors.address = "Delivery address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDetails()) {
      setStep("payment");
    }
  };

  const triggerPaymentProcess = (simulateFail: boolean = false) => {
    setStep("processing");

    // Simulate backend payment verification delay
    setTimeout(() => {
      if (simulateFail) {
        setStep("failed");
      } else {
        const generatedOrderId = "RANJI-" + Math.floor(100000 + Math.random() * 900000);
        setOrderId(generatedOrderId);
        setStep("success");

        // Fire celebration confetti
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (e) {
          console.error(e);
        }

        // Clear cart on success
        clearCart();
      }
    }, 1800);
  };

  // Generate WhatsApp message content for order confirmation
  const getWhatsAppOrderLink = () => {
    const itemsSummary = items
      .map((it) => `• ${it.productName} (${it.sizeName}) x ${it.quantity} = ₹${it.unitPrice * it.quantity}`)
      .join("%0A");

    const message = `Hello Ranji Textiles, I have placed an order!%0A%0A*Order ID:* ${orderId}%0A*Customer:* ${formData.fullName} (${formData.phone})%0A*Address:* ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}%0A%0A*Order Summary:*%0A${itemsSummary}%0A%0A*Subtotal:* ₹${subtotal.toFixed(2)}%0A*Shipping:* ₹${shippingFee.toFixed(2)}%0A*Total Amount:* ₹${finalTotal.toFixed(2)}%0A*Payment Mode:* Demo (${paymentMethod.toUpperCase()})%0A%0APlease share invoice and dispatch timeline.`;

    return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${message}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#F5EFE6] rounded-3xl shadow-2xl border border-[#E5D9CB] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E5D9CB] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg sm:text-xl font-semibold text-[#573820]">
              {step === "details" && "Wholesale Checkout"}
              {step === "payment" && "Select Payment Method"}
              {step === "processing" && "Processing Payment"}
              {step === "success" && "Order Confirmed"}
              {step === "failed" && "Payment Simulation Error"}
            </span>
          </div>

          {step !== "processing" && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#E8DCCF] text-[#573820] transition-colors cursor-pointer"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Content Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 lg:p-8">
          
          {/* STEP 1: CUSTOMER DETAILS FORM */}
          {step === "details" && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              
              {/* Order Summary Snapshot */}
              <div className="bg-white rounded-2xl p-4 border border-[#E5D9CB] space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#B77B63]">
                  <span>Order Items ({totalQuantity} pieces)</span>
                  <span>{STORE_CONFIG.currency.symbol}{finalTotal.toFixed(2)}</span>
                </div>
                
                <div className="max-h-36 overflow-y-auto divide-y divide-[#E5D9CB]/50 text-xs">
                  {items.map((item) => (
                    <div key={item.id} className="py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-8 h-8 rounded-md object-cover border border-[#E5D9CB]"
                        />
                        <div>
                          <p className="font-semibold text-[#573820]">{item.productName}</p>
                          <p className="text-[10px] text-[#8C6B52]">
                            Size: {item.sizeName} • Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-[#573820]">
                        {STORE_CONFIG.currency.symbol}{(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#E5D9CB] flex justify-between text-xs text-[#8C6B52]">
                  <span>Subtotal: {STORE_CONFIG.currency.symbol}{subtotal.toFixed(2)}</span>
                  <span>Shipping: {shippingFee === 0 ? "FREE" : `${STORE_CONFIG.currency.symbol}${shippingFee.toFixed(2)}`}</span>
                  <span className="font-bold text-[#573820]">Total: {STORE_CONFIG.currency.symbol}{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Customer Contact & Shipping Details */}
              <div className="space-y-4">
                <h3 className="font-serif text-base font-semibold text-[#573820]">
                  Customer & Delivery Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#573820]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Ramesh Kumar"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#B77B63] ${
                        errors.fullName ? "border-red-500 bg-red-50" : "border-[#E5D9CB]"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#573820]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#B77B63] ${
                        errors.phone ? "border-red-500 bg-red-50" : "border-[#E5D9CB]"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#573820]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. ramesh@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#B77B63] ${
                        errors.email ? "border-red-500 bg-red-50" : "border-[#E5D9CB]"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Delivery Address */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#573820]">
                      Delivery Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address, building, shop/clinic number"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#B77B63] ${
                        errors.address ? "border-red-500 bg-red-50" : "border-[#E5D9CB]"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-[11px] text-red-600">{errors.address}</p>
                    )}
                  </div>

                  {/* City */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#573820]">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Chennai / Coimbatore"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#B77B63] ${
                        errors.city ? "border-red-500 bg-red-50" : "border-[#E5D9CB]"
                      }`}
                    />
                    {errors.city && (
                      <p className="text-[11px] text-red-600">{errors.city}</p>
                    )}
                  </div>

                  {/* State */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#573820]">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="e.g. Tamil Nadu"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#B77B63] ${
                        errors.state ? "border-red-500 bg-red-50" : "border-[#E5D9CB]"
                      }`}
                    />
                    {errors.state && (
                      <p className="text-[11px] text-red-600">{errors.state}</p>
                    )}
                  </div>

                  {/* Pincode */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#573820]">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="e.g. 641602"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#B77B63] ${
                        errors.pincode ? "border-red-500 bg-red-50" : "border-[#E5D9CB]"
                      }`}
                    />
                    {errors.pincode && (
                      <p className="text-[11px] text-red-600">{errors.pincode}</p>
                    )}
                  </div>

                  {/* Company Name / GSTIN (Optional for Wholesale) */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#573820]">
                      Business / Boutique Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="For wholesale invoice"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D9CB] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#B77B63]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#E5D9CB] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-[#8C6B52] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Wholesale direct checkout • SSL Encrypted</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#573820] text-[#F5EFE6] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#3E2412] active:scale-98 transition-all shadow-md cursor-pointer"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* STEP 2: PAYMENT METHOD MODAL */}
          {step === "payment" && (
            <div className="space-y-6">
              
              {/* Demo Mode Notice */}
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <span className="font-bold block">DEMO PAYMENT MODE ACTIVE</span>
                  This store is configured with Razorpay SDK scaffolding. Real payments are not charged. You can test both successful payment confirmation and error simulation below.
                </div>
              </div>

              {/* Order Summary & Customer Recap */}
              <div className="bg-white rounded-2xl p-4 border border-[#E5D9CB] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6B52] block">
                    Paying For Order
                  </span>
                  <p className="font-serif text-lg font-semibold text-[#573820]">
                    {formData.fullName} • {formData.city}, {formData.pincode}
                  </p>
                  <p className="text-xs text-[#8C6B52]">
                    {totalQuantity} items • Delivery to {formData.address}
                  </p>
                </div>
                
                <div className="sm:text-right">
                  <span className="text-xs text-[#8C6B52] block">Total Payable</span>
                  <span className="font-serif text-2xl font-bold text-[#573820]">
                    {STORE_CONFIG.currency.symbol}{finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment Methods Tabs */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-[#573820] uppercase tracking-wider block">
                  Select Payment Method:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* UPI */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === "upi"
                        ? "bg-[#573820] text-white border-[#573820] shadow-sm"
                        : "bg-white text-[#573820] border-[#E5D9CB] hover:bg-[#E8DCCF]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-3">
                      <QrCode className="w-5 h-5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-800 px-1.5 py-0.5 rounded">
                        Fastest
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">UPI / QR</h4>
                      <p className={`text-[11px] mt-0.5 ${paymentMethod === "upi" ? "text-white/80" : "text-[#8C6B52]"}`}>
                        GPay, PhonePe, Paytm, BHIM
                      </p>
                    </div>
                  </button>

                  {/* Cards */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === "card"
                        ? "bg-[#573820] text-white border-[#573820] shadow-sm"
                        : "bg-white text-[#573820] border-[#E5D9CB] hover:bg-[#E8DCCF]/50"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mb-3" />
                    <div>
                      <h4 className="text-sm font-semibold">Debit / Credit Card</h4>
                      <p className={`text-[11px] mt-0.5 ${paymentMethod === "card" ? "text-white/80" : "text-[#8C6B52]"}`}>
                        Visa, Mastercard, RuPay
                      </p>
                    </div>
                  </button>

                  {/* Net Banking */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === "netbanking"
                        ? "bg-[#573820] text-white border-[#573820] shadow-sm"
                        : "bg-white text-[#573820] border-[#E5D9CB] hover:bg-[#E8DCCF]/50"
                    }`}
                  >
                    <Building2 className="w-5 h-5 mb-3" />
                    <div>
                      <h4 className="text-sm font-semibold">Net Banking</h4>
                      <p className={`text-[11px] mt-0.5 ${paymentMethod === "netbanking" ? "text-white/80" : "text-[#8C6B52]"}`}>
                        All Major Indian Banks
                      </p>
                    </div>
                  </button>

                </div>
              </div>

              {/* Sub-form based on selected payment method */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5D9CB] space-y-4">
                {paymentMethod === "upi" && (
                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-[#573820]">
                      Enter Virtual Payment Address (UPI ID)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. mobileNumber@upi or boutique@okaxis"
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#E5D9CB] text-sm focus:outline-none focus:ring-2 focus:ring-[#B77B63]"
                      />
                      <button
                        type="button"
                        onClick={() => setUpiId("9626888375@upi")}
                        className="text-xs px-3 py-2 bg-[#E8DCCF] text-[#573820] font-medium rounded-xl hover:bg-[#DBCABA]"
                      >
                        Use Demo UPI
                      </button>
                    </div>
                    <p className="text-[11px] text-[#8C6B52]">
                      A payment request will be simulated to this UPI handle.
                    </p>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#573820]">
                        Card Number (Demo)
                      </label>
                      <input
                        type="text"
                        defaultValue="4111 •••• •••• 1111"
                        readOnly
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D9CB] text-sm bg-neutral-50 font-mono text-neutral-600"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#573820]">Expiry</label>
                        <input
                          type="text"
                          defaultValue="12/28"
                          readOnly
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D9CB] text-sm bg-neutral-50 text-neutral-600"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#573820]">CVV</label>
                        <input
                          type="password"
                          defaultValue="•••"
                          readOnly
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D9CB] text-sm bg-neutral-50 text-neutral-600"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#573820]">
                      Select Bank
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D9CB] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#B77B63]"
                    >
                      <option>HDFC Bank</option>
                      <option>State Bank of India (SBI)</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                      <option>Punjab National Bank</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-[#8C6B52] hover:text-[#573820] text-center"
                >
                  ← Edit Address
                </button>

                <div className="flex-1 flex gap-2 w-full">
                  <button
                    type="button"
                    onClick={() => triggerPaymentProcess(false)}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#573820] text-[#F5EFE6] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#3E2412] active:scale-98 transition-all shadow-md cursor-pointer"
                  >
                    <Lock className="w-4 h-4 text-[#E8DCCF]" />
                    <span>
                      Pay {STORE_CONFIG.currency.symbol}{finalTotal.toFixed(2)} (Demo)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerPaymentProcess(true)}
                    className="px-3 py-3 text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
                    title="Simulate payment gateway error"
                  >
                    Test Failure
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: PROCESSING STATE */}
          {step === "processing" && (
            <div className="py-12 sm:py-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-[#B77B63] animate-spin" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-semibold text-[#573820]">
                  Contacting Payment Gateway...
                </h3>
                <p className="text-xs text-[#8C6B52] max-w-sm">
                  Simulating 256-bit encrypted Razorpay token verification for {STORE_CONFIG.currency.symbol}{finalTotal.toFixed(2)}. Please do not refresh.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS STATE */}
          {step === "success" && (
            <div className="py-6 sm:py-8 flex flex-col items-center text-center space-y-6">
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Wholesale Order Confirmed
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#573820]">
                  Thank You, {formData.fullName}!
                </h2>
                <p className="text-xs sm:text-sm text-[#8C6B52] max-w-md">
                  Your wholesale booking with Ranji Textiles has been received. Our production team in Tiruppur will prepare your order.
                </p>
              </div>

              {/* Order Confirmation Card */}
              <div className="w-full max-w-md bg-white rounded-2xl p-5 border border-[#E5D9CB] text-left space-y-3 shadow-xs">
                <div className="flex justify-between items-center pb-3 border-b border-[#E5D9CB]">
                  <span className="text-xs text-[#8C6B52]">Order Reference:</span>
                  <span className="font-mono text-sm font-bold text-[#573820]">{orderId}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8C6B52]">Total Paid:</span>
                  <span className="font-bold text-[#573820]">{STORE_CONFIG.currency.symbol}{finalTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8C6B52]">Shipping To:</span>
                  <span className="font-medium text-[#573820] text-right truncate max-w-[200px]">
                    {formData.city}, {formData.state} - {formData.pincode}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8C6B52]">Contact:</span>
                  <span className="font-medium text-[#573820]">{formData.phone}</span>
                </div>
              </div>

              {/* Instant WhatsApp Order Dispatch Link */}
              <div className="w-full max-w-md space-y-3">
                <a
                  href={getWhatsAppOrderLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#20ba59] active:scale-98 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send Order Confirmation on WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-[#8C6B52] hover:text-[#573820] text-center"
                >
                  Return to Home
                </button>
              </div>

            </div>
          )}

          {/* STEP 5: FAILED / RETRY STATE */}
          {step === "failed" && (
            <div className="py-8 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 shadow-sm">
                <AlertCircle className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl font-semibold text-[#573820]">
                  Payment Authorization Failed (Simulation)
                </h3>
                <p className="text-xs text-[#8C6B52] max-w-md">
                  This simulated payment was rejected by the test gateway. Your order has not been charged.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep("payment")}
                  className="px-6 py-3 rounded-xl bg-[#573820] text-[#F5EFE6] text-xs font-semibold flex items-center gap-2 hover:bg-[#3E2412]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Try Again
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl border border-[#E5D9CB] bg-white text-xs font-semibold text-[#573820] hover:bg-[#E8DCCF]"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
