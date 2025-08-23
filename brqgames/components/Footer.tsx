export function Footer() {
  return (
    <footer className="border-t border-neutral-800 mt-12">
      <div className="container py-8 text-sm flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} متجر برق للألعاب. جميع الحقوق محفوظة.</p>
        <p className="opacity-70">موقع استعراضي قابل للنشر على Vercel.</p>
      </div>
    </footer>
  );
}
