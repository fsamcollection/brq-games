"use client";

import { useCart } from "@/components/cart/CartContext";
import { useState } from "react";

export default function Checkout() {
  const { items, clear } = useCart();
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">تم استلام طلبك ✅</h1>
        <p className="opacity-80">طلبك قيد المعالجة، ستصلك رسالة تأكيد عبر البريد.</p>
        <p className="opacity-80">رقم الطلب: <strong>{(typeof window!== "undefined" ? localStorage.getItem("barq-order") : "")}</strong></p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">إتمام الشراء</h1>
      <form
        className="card grid grid-cols-1 md:grid-cols-2 gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const order = "BRQ" + Math.floor(Math.random()*900000+100000);
          if (typeof window !== "undefined") localStorage.setItem("barq-order", order);
          clear();
          setDone(true);
        }}
      >
        <input className="rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2" placeholder="الاسم الكامل" required />
        <input className="rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2" placeholder="البريد الإلكتروني" type="email" required />
        <input className="rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2" placeholder="البلد / المدينة" required />
        <input className="rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2" placeholder="العنوان" required />
        <input className="rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2" placeholder="الهاتف" required />
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
          <button type="button" className="px-4 py-2 rounded-2xl border border-neutral-700 hover:bg-neutral-800" onClick={()=>alert("Stripe مفتاح عام: " + (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "غير محدد"))}>الدفع عبر Stripe (تجريبي)</button>
          <button type="button" className="px-4 py-2 rounded-2xl border border-neutral-700 hover:bg-neutral-800" onClick={()=>alert("Tap مفتاح عام: " + (process.env.NEXT_PUBLIC_TAP_PUBLIC_KEY || "غير محدد"))}>الدفع عبر Tap (تجريبي)</button>
        </div>
        <button className="btn md:col-span-2" type="submit">إرسال الطلب</button>
      </form>
    </div>
  );
}
