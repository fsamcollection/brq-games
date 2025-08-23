"use client";

export default function Contact() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">تواصل معنا</h1>
      <form
        className="card grid grid-cols-1 md:grid-cols-2 gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          alert("تم إرسال رسالتك. سنعود إليك قريبًا.");
        }}
      >
        <input
          className="rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2"
          placeholder="اسمك"
          required
        />
        <input
          className="rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2"
          placeholder="بريدك الإلكتروني"
          type="email"
          required
        />
        <textarea
          className="rounded-xl bg-neutral-800 border border-neutral-700 px-3 py-2 md:col-span-2"
          rows={5}
          placeholder="رسالتك…"
          required
        />
        <button className="btn md:col-span-2" type="submit">
          إرسال
        </button>
      </form>
    </div>
  );
}
