import type { Metadata } from "next";
import { Alexandria, Tajawal } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-alexandria",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "الغصن الأخضر — Green Branch | منصتك الزراعية الشاملة",
    template: "%s | الغصن الأخضر",
  },
  description:
    "منصة الغصن الأخضر: مقالات إرشادية، فيديوهات تعليمية، ونصائح عملية في كل ما يخص الزراعة — العنب، التين، الحمضيات، التسميد، تقنيات الإثمار، والوقاية.",
  keywords: [
    "زراعة",
    "العنب",
    "التين",
    "الحمضيات",
    "التسميد",
    "الإثمار",
    "المبيدات",
    "الغصن الأخضر",
    "Green Branch",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${alexandria.variable} ${tajawal.variable}`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
