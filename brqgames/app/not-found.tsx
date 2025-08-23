export default function NotFound() {
  return (
    <div className="py-16 text-center space-y-3">
      <h1 className="text-3xl font-extrabold">الصفحة غير موجودة</h1>
      <p className="opacity-80">تأكد من الرابط أو عد إلى الصفحة الرئيسية.</p>
      <a className="btn" href="/">العودة للرئيسية</a>
    </div>
  );
}
