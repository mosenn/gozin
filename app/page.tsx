import { Container } from "./components/layouts/Container";
import { Section } from "./components/layouts/Section";
import Loading from "@/components/ui/Loading";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100" dir="rtl">
      <Container>
        {/* سکشن ۱ */}
        <Section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 ">
          <h2 className="text-xl font-bold text-blue-400">
            🎬 فیلم‌های پیشنهادی
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            فاصله کل ساختار با رپر Container و فاصله عمودی با Section هندل
            می‌شود.
          </p>
        </Section>
        {/* سکشن ۲: گرید با استفاده مستقیم از Breakpoints */}
        <Section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold text-blue-400 mb-4">
            📚 کتاب‌ها و مجلات
          </h2>
          <div className="grid grid-cols-1 sm6:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-center">
              آیتم ۱
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-center">
              آیتم ۲
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-center">
              آیتم ۳
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-center">
              آیتم ۴
            </div>
          </div>
        </Section>
      </Container>
    </main>
  );
}
