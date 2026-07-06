"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Heart,
  GraduationCap,
  CheckSquare,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  Star,
  Plus,
  Check,
  Package,
  Compass,
  BookOpen,
  PenTool,
  Menu,
  X
} from "lucide-react";

// Mock Data for Grade Assistant
const GRADE_PACKAGES: Record<number, { title: string; price: number; oldPrice: number; items: string[]; bg: string }> = {
  1: {
    title: "1-Sinf Boshlang'ich To'plami",
    price: 245000,
    oldPrice: 310000,
    items: [
      "Ergonomik maktab ryukzagi (Ortopedik)",
      "12 ta katak va chiziq daftarlar (12 varaq)",
      "Maped qalamlar to'plami (12 rangli)",
      "ErichKrause chizg'ich va o'chirg'ich",
      "San'at albomi va suvli bo'yoqlar",
    ],
    bg: "from-blue-500/10 to-indigo-500/10",
  },
  2: {
    title: "2-Sinf O'quvchi To'plami",
    price: 260000,
    oldPrice: 330000,
    items: [
      "Ergonomik ryukzak (Yengil weight)",
      "15 ta daftarlar (18 varaqli qalin muqova)",
      "Sharli va gel ruchkalar to'plami (Ko'k/Yashil)",
      "Geometrik chizg'ichlar to'plami",
      "Plastilin va rangli qog'ozlar",
    ],
    bg: "from-emerald-500/10 to-teal-500/10",
  },
  3: {
    title: "3-Sinf Rivojlanish To'plami",
    price: 285000,
    oldPrice: 360000,
    items: [
      "Zamonaviy sport uslubidagi ryukzak",
      "20 ta daftarlar (24 varaqli qalin muqova)",
      "Sifatli penallar va organizatorlar",
      "Tsirkul va transportir to'plami",
      "Ingliz tili lug'at daftari",
    ],
    bg: "from-purple-500/10 to-pink-500/10",
  },
  4: {
    title: "4-Sinf Bitiruvchi To'plami",
    price: 310000,
    oldPrice: 390000,
    items: [
      "Premium ryukzak (Suv o'tkazmaydigan)",
      "25 ta turli xil daftarlar to'plami",
      "To'liq geometriya va chizmachilik to'plami",
      "Akril bo'yoqlar va mo'yqalamlar",
      "Maxsus stol usti organizatori",
    ],
    bg: "from-amber-500/10 to-orange-500/10",
  },
  5: {
    title: "5-Sinf Katta Sinfga Qadam To'plami",
    price: 350000,
    oldPrice: 440000,
    items: [
      "o'smirlar uchun zamonaviy ryukzak (USB portli)",
      "30 ta umumiy daftarlar (36, 48 varaqli)",
      "Professional geometriya to'plami (Metall tsirkul)",
      "Botanika va Tarix atlaslari/kontur xaritalar",
      "Elektron kalkulyator va premium ruchkalar",
    ],
    bg: "from-cyan-500/10 to-blue-500/10",
  },
  6: {
    title: "6-Sinf Akademik To'plami",
    price: 380000,
    oldPrice: 480000,
    items: [
      "Urban uslubidagi ergonomik sumka",
      "35 ta umumiy va fan daftarlari (60, 96 varaq)",
      "Fizika va Geometriya o'quv qurollari",
      "Premium chizmachi qalamlar to'plami",
      "Yuqori sig'imli penal va tekst-xaylayterlar",
    ],
    bg: "from-indigo-500/10 to-violet-500/10",
  },
  7: {
    title: "7-Sinf Pro Student To'plami",
    price: 420000,
    oldPrice: 530000,
    items: [
      "Minimalist Pro Ryukzak (Noutbuk bo'limi bilan)",
      "40 ta umumiy daftarlar (Barcha fanlar uchun)",
      "Algebra va Kimyo maxsus qoidalar daftari",
      "Professional chizmachilik va grafik qurollar",
      "Premium po'lat termos-butilka (Suv uchun)",
    ],
    bg: "from-blue-600/10 to-emerald-600/10",
  },
};

const CATEGORIES = [
  { name: "Maktab Sumkalari", count: 124, icon: Package, color: "bg-blue-50 text-blue-600" },
  { name: "Daftarlar va Albomlar", count: 310, icon: BookOpen, color: "bg-emerald-50 text-emerald-600" },
  { name: "Ruchka va Qalamlar", count: 450, icon: PenTool, color: "bg-purple-50 text-purple-600" },
  { name: "Geometriya To'plamlari", count: 85, icon: Compass, color: "bg-amber-50 text-amber-600" },
  { name: "Maktab Formasi", count: 190, icon: GraduationCap, color: "bg-rose-50 text-rose-600" },
  { name: "Aksessuarlar", count: 220, icon: Sparkles, color: "bg-cyan-50 text-cyan-600" },
];

const POPULAR_PRODUCTS = [
  {
    id: 1,
    title: "Ortopedik Maktab Ryukzagi 'Pro-Ergo 2026'",
    price: 245000,
    oldPrice: 310000,
    rating: 4.9,
    reviews: 128,
    grade: "1-4 sinflar uchun",
    badge: "-21%",
    badgeColor: "bg-emerald-500",
    imageText: "🎒 Pro Ryukzak",
  },
  {
    id: 2,
    title: "Premium 12-Varaqli Daftarlar To'plami (10 ta)",
    price: 18000,
    oldPrice: 24000,
    rating: 4.8,
    reviews: 340,
    grade: "Barcha sinflar",
    badge: "Xit Sotuv",
    badgeColor: "bg-blue-600",
    imageText: "📓 10x Daftar",
  },
  {
    id: 3,
    title: "Maped ColorPeps 24-Rangli Qalamlar To'plami",
    price: 45000,
    oldPrice: 58000,
    rating: 5.0,
    reviews: 89,
    grade: "1-7 sinflar",
    badge: "Yangi",
    badgeColor: "bg-purple-600",
    imageText: "✏️ 24x Qalam",
  },
  {
    id: 4,
    title: "Metall Tsirkul va Geometriya Pro To'plami",
    price: 35000,
    oldPrice: 45000,
    rating: 4.7,
    reviews: 64,
    grade: "5-7 sinflar",
    badge: "-22%",
    badgeColor: "bg-emerald-500",
    imageText: "📐 Geometriya",
  },
];

export default function MaktabStartHome() {
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const [cartCount, setCartCount] = useState<number>(2);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [checklist, setChecklist] = useState([
    { id: 1, name: "Maktab ryukzagi (Ortopedik)", checked: true },
    { id: 2, name: "12 ta umumiy daftar (48 varaq)", checked: true },
    { id: 3, name: "Ko'k va qora gel ruchkalar", checked: false },
    { id: 4, name: "Geometrik chizg'ichlar to'plami", checked: false },
    { id: 5, name: "Maktab formasi va oq ko'ylak", checked: false },
  ]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const completedChecklistCount = checklist.filter((item) => item.checked).length;
  const checklistProgress = Math.round((completedChecklistCount / checklist.length) * 100);

  const triggerToast = (msg: string, countAdd = 1) => {
    setCartCount((prev) => prev + countAdd);
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const toggleChecklist = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const currentPackage = GRADE_PACKAGES[selectedGrade];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 selection:bg-blue-600 selection:text-white relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 backdrop-blur-xl"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">{toastMessage}</p>
              <p className="text-xs text-slate-400">Savatga o'tib buyurtmani rasmiylashtiring</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Glass Navbar */}
      <header className="sticky top-0 z-40 glass-nav transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <GraduationCap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Maktab<span className="text-blue-600">Start</span>
              </span>
              <span className="block text-[10px] font-medium text-emerald-600 uppercase tracking-wider">
                1-7 Sinf Bozori
              </span>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
            <input
              type="text"
              placeholder="Mahsulot, sinf yoki to'plam qidiring... (Ctrl + K)"
              className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-800 text-sm rounded-xl pl-10 pr-12 py-2.5 border border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <kbd className="absolute right-3 top-2.5 bg-white text-slate-400 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200 shadow-sm">
              ⌘K
            </kbd>
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>Checklist</span>
            </button>

            <button className="relative w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center transition-colors">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                3
              </span>
            </button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => triggerToast("Savat paneli ochilmoqda...", 0)}
              className="relative px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-sm flex items-center gap-2.5 shadow-lg shadow-blue-500/25 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Savat</span>
              <motion.span
                key={cartCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white text-blue-600 font-bold text-xs px-2 py-0.5 rounded-full"
              >
                {cartCount}
              </motion.span>
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search & Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-200 bg-white/95 px-4 py-4 space-y-3"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Qidiruv..."
                  className="w-full bg-slate-100 text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
              <div className="flex justify-around pt-2">
                <button className="text-xs font-medium text-slate-600 flex items-center gap-1">
                  <CheckSquare className="w-4 h-4 text-emerald-600" /> Checklist
                </button>
                <button className="text-xs font-medium text-slate-600 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-blue-600" /> Grade Assistant
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-white via-slate-50 to-white">
        {/* Background Mesh Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-mesh-1 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-mesh-2 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: "3s" }} />
            <span>O'zbekistonda #1 Smart Maktab Bozori • 2026 Yangi Mavsum</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15]"
          >
            Sinfingizni tanlang va maktabga{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">
              5 daqiqada
            </span>{" "}
            tayyor bo'ling!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal"
          >
            1–7 sinf o'quvchilari uchun o'qituvchilar tasdiqlagan tayyor qurollar to'plami. Vaqtingizni bozorlarda o'tkazmang — uydan turib bitta klik bilan buyurtma bering!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#grade-assistant"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-base shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Sinf bo'yicha yig'ish</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#catalog"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-sm flex items-center justify-center gap-2 transition-all hover:border-slate-300"
            >
              <span>Katalogga o'tish</span>
            </a>
          </motion.div>

          {/* Benefits Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { icon: Truck, title: "1 Kunda Yetkazish", desc: "Toshkent va viloyatlarga tezkor kuryer", color: "text-blue-600 bg-blue-50" },
              { icon: ShieldCheck, title: "100% Sifat Kafolati", desc: "Faqat tekshirilgan brend mahsulotlar", color: "text-emerald-600 bg-emerald-50" },
              { icon: Sparkles, title: "50%-gacha Tejamkorlik", desc: "To'plam olganda maxsus chegirma", color: "text-purple-600 bg-purple-50" },
              { icon: Package, title: "Qulay To'lov", desc: "Qabul qilganda naqd yoki Payme/Click", color: "text-amber-600 bg-amber-50" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                className="glass-card rounded-2xl p-4 text-left flex flex-col justify-between"
              >
                <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-3 shadow-sm`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GRADE ASSISTANT (The Star Feature) */}
      <section id="grade-assistant" className="py-16 md:py-24 bg-white relative border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-blue-600 font-semibold text-xs sm:text-sm tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
              ✨ Smart Grade Assistant
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 tracking-tight">
              Sinfingizni tanlang — biz tayyor ro'yxatni ko'rsatamiz!
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              O'qituvchilar tavsiyasiga ko'ra tuzilgan maxsus paketlar. Keraklisini qo'shing yoki barchasini 1 klikda oling.
            </p>
          </div>

          {/* Grade Selector Pills */}
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 pt-2 scrollbar-none">
            {[1, 2, 3, 4, 5, 6, 7].map((grade) => {
              const isActive = selectedGrade === grade;
              return (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                      : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                  }`}
                >
                  <GraduationCap className={`w-5 h-5 ${isActive ? "text-white" : "text-blue-600"}`} />
                  <span>{grade}-Sinf</span>
                </button>
              );
            })}
          </div>

          {/* Recommended Package Card */}
          <motion.div
            key={selectedGrade}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className={`mt-8 rounded-3xl p-6 sm:p-8 lg:p-10 bg-gradient-to-br ${currentPackage.bg} border border-slate-200/80 shadow-xl relative overflow-hidden`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Info */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tayyor To'plam • 54 ta buyum ichida</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {currentPackage.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base mt-2">
                    Shu sinf uchun yil davomida kerak bo'ladigan barcha daftarlar, qalamlar, geometriya qurollari va ryukzak.
                  </p>
                </div>

                {/* Items Checklist */}
                <div className="space-y-3 bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    To'plam tarkibi:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentPackage.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-800 font-medium">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Price & CTA */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-100 flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    To'plam uchun maxsus narx
                  </span>
                  <div className="mt-2 flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                      {currentPackage.price.toLocaleString()}{" "}
                      <span className="text-sm sm:text-base font-normal text-slate-500">so'm</span>
                    </span>
                    <span className="text-base sm:text-lg text-slate-400 line-through">
                      {currentPackage.oldPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Siz {((currentPackage.oldPrice - currentPackage.price)).toLocaleString()} so'm tejaysiz!</span>
                  </p>
                </div>

                <div className="mt-8 space-y-3">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => triggerToast(`${selectedGrade}-Sinf to'xtami (54 buyum) savatga qo'shildi!`, 1)}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Barchasini Savatga Qo'shish</span>
                  </motion.button>
                  <button className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors">
                    Tarkibni o'zgartirish
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section id="catalog" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Mashhur Kategoriyalar
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Barcha turdagi maktab qurollari va aksessuarlar katalogi
              </p>
            </div>
            <a href="#all-categories" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Barcha 13 ta kategoriyani ko'rish <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group"
              >
                <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <span className="text-xs text-slate-400 mt-1 font-medium">{cat.count} ta mahsulot</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS GRID */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              🔥 Hafta Xitlari & Eng Ko'p Sotilganlar
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Ota-onalar va o'quvchilar eng ko'p tanlayotgan sifatli mahsulotlar
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col justify-between relative"
              >
                {/* Image Placeholder & Badges */}
                <div className="relative aspect-square w-full rounded-xl bg-slate-50 flex items-center justify-center text-3xl font-bold text-slate-400 overflow-hidden mb-4 border border-slate-100">
                  <span className="group-hover:scale-110 transition-transform duration-500">{prod.imageText}</span>
                  
                  <span className={`absolute top-3 left-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm ${prod.badgeColor}`}>
                    {prod.badge}
                  </span>

                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur text-slate-600 hover:text-rose-500 flex items-center justify-center shadow-sm transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Info */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span className="bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded text-[11px]">
                      {prod.grade}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{prod.rating}</span>
                      <span className="text-slate-400 font-normal">({prod.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                    {prod.title}
                  </h3>
                </div>

                {/* Price & Cart CTA */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div>
                    {prod.oldPrice && (
                      <span className="text-xs text-slate-400 line-through block font-normal">
                        {prod.oldPrice.toLocaleString()} so'm
                      </span>
                    )}
                    <span className="text-lg font-extrabold text-slate-900">
                      {prod.price.toLocaleString()} <span className="text-xs font-normal text-slate-500">so'm</span>
                    </span>
                  </div>

                  <button
                    onClick={() => triggerToast(`${prod.title} savatga qo'shildi!`, 1)}
                    className="w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all active:scale-95"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE CHECKLIST PROMO WIDGET */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs px-3.5 py-1.5 rounded-full inline-block">
                ☑ Interaktiv Maktab Checklist
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Hech narsa yoddan chiqmasligi uchun jonli ro'yxat!
              </h2>
              <p className="text-slate-300 text-base sm:text-lg">
                Uydagi bor qurollarni belgilab chiqing. Biz yetishmayotgan buyumlarnimi aniq hisoblab, sizga maxsus chegirmali to'plam yasab beramiz.
              </p>
              
              <div className="pt-2">
                <button
                  onClick={() => triggerToast("To'liq checklist sahifasiga o'tilmoqda...", 0)}
                  className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-500/20 flex items-center gap-3 transition-all hover:scale-105"
                >
                  <CheckSquare className="w-5 h-5" />
                  <span>To'liq Checklistni Ochish</span>
                </button>
              </div>
            </div>

            {/* Live Widget Preview */}
            <div className="lg:col-span-6 bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-base text-slate-200">
                  🎒 5-Sinf Tayyorgarlik Ro'yxati
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  {checklistProgress}% Tayyor
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden mb-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${checklistProgress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                />
              </div>

              {/* Checklist items */}
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      item.checked
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : "bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          item.checked ? "bg-emerald-500 border-emerald-500 text-slate-950" : "border-slate-500"
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className={`text-sm font-medium ${item.checked ? "line-through text-slate-400" : ""}`}>
                        {item.name}
                      </span>
                    </div>
                    {!item.checked && (
                      <span className="text-xs text-blue-400 font-semibold hover:underline">
                        + Savatga
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
              <GraduationCap className="w-6 h-6 text-blue-500" />
              <span>MaktabStart</span>
            </div>
            <p className="text-sm text-slate-400">
              1–7 sinf o'quvchilari uchun O'zbekistondagi eng chiroyli va tezkor onlayn maktab buyumlari bozori.
            </p>
            <p className="text-xs text-slate-500 mt-4">© 2026 MaktabStart startup loyihasi.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Kategoriyalar</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Maktab Ryukzaklari</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Daftarlar va Albomlar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Qalamlar va Ruchkalar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Geometriya qurollari</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Mijozlarga yordam</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Tez-tez beriladigan savollar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Yetkazib berish qoidalari</a></li>
              <li><a href="#" className="hover:text-white transition-colors">To'lov usullari (Click / Payme)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chegirmalar va Kuponlar</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">To'lov va Xavfsizlik</h4>
            <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-300">
              <span className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700">CLICK</span>
              <span className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700">PAYME</span>
              <span className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700">UZCARD</span>
              <span className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700">HUMO</span>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Barcha to'lovlar 256-bit SSL shifrlangan va xavfsiz amalga oshiriladi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
