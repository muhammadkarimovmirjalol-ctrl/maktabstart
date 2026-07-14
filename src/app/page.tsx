"use client";

import React, { useState, useEffect } from "react";
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
  X,
  Calculator,
  Filter,
  Trash2,
  CreditCard,
  MapPin,
  Phone,
  User,
  ShoppingBag,
  Award,
  Clock,
  LogIn,
  LogOut,
  List,
  Grid,
  Info,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  UserCheck,
  Bell,
  Layers
} from "lucide-react";

// Types
interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  category: string;
  grade: number[];
  rating: number;
  reviews: number;
  badge?: string;
  badgeColor?: string;
  image: string;
  inStock: boolean;
  description: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface UserAccount {
  name: string;
  phone: string;
  role: "Ota-ona" | "O'quvchi" | "O'qituvchi";
  avatar: string;
  isLoggedIn: boolean;
}

// Background Study Images (4 Premium Unsplash Photos with Blur)
const STUDY_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2000&auto=format&fit=crop",
];

// Expanded 16+ Real School Products with HIGH-RESOLUTION PHOTOS (Uzbekistan Favorites)
const PRODUCTS: Product[] = [
  { id: 1, title: "Ortopedik Maktab Ryukzagi 'Pro-Ergo 2026'", price: 245000, oldPrice: 310000, category: "Maktab Sumkalari", grade: [1, 2, 3, 4], rating: 4.9, reviews: 128, badge: "-21%", badgeColor: "bg-emerald-500", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop", inStock: true, description: "Belni asrovchi ortopedik suyanchiq, suv o'tkazmas mato va yorug'lik qaytaruvchi chiziqlari bor." },
  { id: 2, title: "Premium 12-Varaqli Daftarlar To'plami (10 ta)", price: 18000, oldPrice: 24000, category: "Daftarlar", grade: [1, 2, 3, 4, 5, 6, 7], rating: 4.8, reviews: 340, badge: "Xit Sotuv", badgeColor: "bg-blue-600", image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800&auto=format&fit=crop", inStock: true, description: "Oq farfor qog'ozli, ko'zni toliqtirmaydigan chiziqli va katakli O'zbekiston standartidagi daftarlar." },
  { id: 3, title: "Maped ColorPeps 24-Rangli Qalamlar To'plami", price: 45000, oldPrice: 58000, category: "Qalamlar", grade: [1, 2, 3, 4, 5, 6, 7], rating: 5.0, reviews: 89, badge: "Yangi", badgeColor: "bg-purple-600", image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop", inStock: true, description: "Yumshoq yozadigan, sinishga chidamli va yorqin rangli ekologik qalamlar." },
  { id: 4, title: "Metall Tsirkul (Sirkul) va Geometriya Pro To'plami", price: 35000, oldPrice: 45000, category: "Geometriya", grade: [5, 6, 7], rating: 4.7, reviews: 64, badge: "-22%", badgeColor: "bg-emerald-500", image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop", inStock: true, description: "Tsirkul, chizg'ich, transportir va o'chirg'ichdan iborat po'lat qurollar to'plami." },
  { id: 5, title: "Ergonomik Sharli Ruchkalar 10 ta (Ko'k va Qora)", price: 22000, oldPrice: 28000, category: "Ruchkalar", grade: [1, 2, 3, 4, 5, 6, 7], rating: 4.9, reviews: 210, badge: "Top Sifat", badgeColor: "bg-blue-600", image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800&auto=format&fit=crop", inStock: true, description: "0.5mm ingichka yozadigan, siyohi oqib ketmaydigan qo'lga qulay ruchkalar." },
  { id: 6, title: "Maktab Formasi Oq Ko'ylak (100% Paxta)", price: 120000, oldPrice: 150000, category: "Forma", grade: [1, 2, 3, 4, 5, 6, 7], rating: 4.8, reviews: 95, badge: "-20%", badgeColor: "bg-emerald-500", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop", inStock: true, description: "Terlatmaydigan tabiiy paxta matodan tutilgan rasmiy maktab ko'ylagi." },
  { id: 7, title: "Suv Uchun Thermo-Butilka (500ml, Zanglamas)", price: 65000, oldPrice: 85000, category: "Aksessuarlar", grade: [1, 2, 3, 4, 5, 6, 7], rating: 4.9, reviews: 156, badge: "Yangi", badgeColor: "bg-purple-600", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop", inStock: true, description: "12 soat davomida suvni issiq yoki yaxna saqlab beruvchi po'lat termos idish." },
  { id: 8, title: "San'at va Chizmachilik Albomi (40 varaq, qalin)", price: 15000, oldPrice: 20000, category: "Daftarlar", grade: [1, 2, 3, 4, 5, 6, 7], rating: 4.7, reviews: 78, badge: "Arzon", badgeColor: "bg-amber-500", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop", inStock: true, description: "Akvarel, gouash va qalamda rasm chizish uchun o'qilmaydigan qalin qog'ozli albom." },
  { id: 9, title: "Urban Pro USB Noutbuk Ryukzagi (Katta Sinf)", price: 290000, oldPrice: 380000, category: "Maktab Sumkalari", grade: [5, 6, 7], rating: 5.0, reviews: 112, badge: "-23%", badgeColor: "bg-emerald-500", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop", inStock: true, description: "USB zaryad portiga ega, zamonaviy dizaynli va ko'p bo'limli ryukzak." },
  { id: 10, title: "Akril Bo'yoqlar 12-Rangli To'plami (Mo'yqalam bilan)", price: 38000, oldPrice: 48000, category: "Qalamlar", grade: [2, 3, 4, 5], rating: 4.8, reviews: 84, badge: "San'at", badgeColor: "bg-pink-600", image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop", inStock: true, description: "Yorqin qurimaydigan akril bo'yoqlar va 2 ta professional mo'yqalam." },
  { id: 11, title: "Maktab Penali 'Smart Organizer' (3 bo'limli)", price: 45000, oldPrice: 55000, category: "Aksessuarlar", grade: [1, 2, 3, 4, 5], rating: 4.9, reviews: 140, badge: "Hit", badgeColor: "bg-blue-600", image: "https://images.unsplash.com/photo-1585336261026-7a466aad4079?q=80&w=800&auto=format&fit=crop", inStock: true, description: "50 ta ruchka va qalam sig'adigan, zamonaviy va chidamli maktab penali." },
  { id: 12, title: "Umumiy 48-Varaqli Daftarlar To'plami (5 ta)", price: 25000, oldPrice: 32000, category: "Daftarlar", grade: [5, 6, 7], rating: 4.9, reviews: 190, badge: "Top", badgeColor: "bg-emerald-500", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop", inStock: true, description: "Fizika, kimyo va algebra fanlari uchun qalin muqovali sifatli daftarlar." },
  { id: 13, title: "Avtomat Qalam yo'ng'ich va o'chirg'ichlar", price: 12000, oldPrice: 16000, category: "Qalamlar", grade: [1, 2, 3, 4, 5, 6, 7], rating: 4.8, reviews: 88, badge: "Arzon", badgeColor: "bg-amber-500", image: "https://images.unsplash.com/photo-1569683795645-b62e50fbf103?q=80&w=800&auto=format&fit=crop", inStock: true, description: "Qog'ozni yirtmasdan tozalovchi yumshoq o'chirg'ichlar va qalam yo'ng'ich." },
  { id: 14, title: "Maktab Formasi To'q Ko'k Shim va Yubka", price: 145000, oldPrice: 180000, category: "Forma", grade: [1, 2, 3, 4, 5, 6, 7], rating: 4.8, reviews: 76, badge: "-19%", badgeColor: "bg-emerald-500", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop", inStock: true, description: "G'ijim bo'lmaydigan, yuvishga chidamli yuqori sifatli maktab shimi va yubkasi." },
  { id: 15, title: "Plastilin 12-Rang va Haykaltaroshlik Qurollari", price: 20000, oldPrice: 26000, category: "Qalamlar", grade: [1, 2, 3], rating: 4.7, reviews: 92, badge: "Boshlang'ich", badgeColor: "bg-purple-600", image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop", inStock: true, description: "Qo'lga yopishmaydigan, xavfsiz va yorqin bolalar plastilini to'plami." },
  { id: 16, title: "Eko Lanch-boks (Ovqat idishi + Qoshiq-vilka)", price: 55000, oldPrice: 70000, category: "Aksessuarlar", grade: [1, 2, 3, 4, 5, 6, 7], rating: 5.0, reviews: 205, badge: "Eko", badgeColor: "bg-teal-600", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop", inStock: true, description: "Bolalar tushlik ovqati uchun issiq saqlovchi bo'limli oziq-ovqat idishi." },
];

const GRADE_PACKAGES: Record<number, { title: string; price: number; oldPrice: number; items: string[]; bg: string }> = {
  1: { title: "1-Sinf Boshlang'ich To'plami", price: 245000, oldPrice: 310000, items: ["Ortopedik ryukzak", "12 ta daftar (12 varaq)", "12 rangli qalamlar", "Chizg'ich va o'chirg'ich", "San'at albomi"], bg: "from-blue-50 to-indigo-50 border-blue-200" },
  2: { title: "2-Sinf O'quvchi To'plami", price: 260000, oldPrice: 330000, items: ["Ergonomik ryukzak", "15 ta daftar (18 varaq)", "Sharli ruchkalar to'plami", "Geometrik chizg'ichlar", "Plastilin va rangli qog'oz"], bg: "from-emerald-50 to-teal-50 border-emerald-200" },
  3: { title: "3-Sinf Rivojlanish To'plami", price: 285000, oldPrice: 360000, items: ["Sport uslubidagi ryukzak", "20 ta daftar (24 varaq)", "Penallar va organizatorlar", "Tsirkul va transportir", "Lug'at daftari"], bg: "from-purple-50 to-pink-50 border-purple-200" },
  4: { title: "4-Sinf Bitiruvchi To'plami", price: 310000, oldPrice: 390000, items: ["Suv o'tkazmaydigan ryukzak", "25 ta turli daftarlar", "Geometriya va chizmachilik", "Akril bo'yoqlar to'plami", "Stol usti organizatori"], bg: "from-amber-50 to-orange-50 border-amber-200" },
  5: { title: "5-Sinf Katta Sinfga Qadam", price: 350000, oldPrice: 440000, items: ["USB portli zamonaviy ryukzak", "30 ta umumiy daftarlar", "Metall tsirkul va geometriya", "Atlaslar va kontur xarita", "Elektron kalkulyator"], bg: "from-cyan-50 to-blue-50 border-cyan-200" },
  6: { title: "6-Sinf Akademik To'plami", price: 380000, oldPrice: 480000, items: ["Urban uslubidagi sumka", "35 ta umumiy daftarlar", "Fizika va Geometriya qurollari", "Chizmachi qalamlar", "Yuqori sig'imli penal"], bg: "from-indigo-50 to-violet-50 border-indigo-200" },
  7: { title: "7-Sinf Pro Student To'plami", price: 420000, oldPrice: 530000, items: ["Minimalist Pro Ryukzak", "40 ta umumiy daftarlar", "Algebra va Kimyo qoidalar daftari", "Grafik chizmachilik qurollari", "Po'lat termos-butilka"], bg: "from-blue-50 to-emerald-50 border-blue-200" },
};

const CATEGORIES = ["Barchasi", "Maktab Sumkalari", "Daftarlar", "Qalamlar", "Ruchkalar", "Geometriya", "Forma", "Aksessuarlar"];

// =========================================================================================
// 12 CATEGORIES & 180+ PRODUCTS MEGA-CATALOG DATA (INSPIRED BY USER SCREENSHOT + BONUS)
// =========================================================================================
const MEGA_CATALOG_DATA = [
  {
    id: 1,
    title: "Forma va kiyim-kechak",
    headerBg: "bg-orange-600 text-white",
    items: [
      { name: "O'g'il bolalar kostyumi", price: 320000 },
      { name: "Qiz bolalar sarafani", price: 250000 },
      { name: "Maktab yubkasi", price: 110000 },
      { name: "Oq ko'ylak, qisqa yeng", price: 95000 },
      { name: "Oq ko'ylak, uzun yeng", price: 120000 },
      { name: "Bluzka", price: 115000 },
      { name: "Galstuk", price: 25000 },
      { name: "Bantik", price: 18000 },
      { name: "Kardigan/jemper", price: 160000 },
      { name: "Jilet", price: 95000 },
      { name: "Sport formasi", price: 185000 },
      { name: "Sport krossovkasi", price: 210000 },
      { name: "Maktab poyabzali", price: 230000 },
      { name: "Kurtka", price: 350000 },
      { name: "Yomg'ir plashi", price: 75000 },
      { name: "Paypoq to'plami", price: 30000 },
      { name: "Ichki kiyim", price: 45000 },
      { name: "Qo'lqop", price: 25000 },
      { name: "Shapka", price: 40000 },
      { name: "Oq aprong (farstuk)", price: 65000 }
    ]
  },
  {
    id: 2,
    title: "Daftarlar va qog'oz",
    headerBg: "bg-indigo-600 text-white",
    items: [
      { name: "12 varaq, chiziqli", price: 2000 },
      { name: "12 varaq, katakli", price: 2000 },
      { name: "18 varaq, katakli", price: 2800 },
      { name: "24 varaq, katakli", price: 3500 },
      { name: "48 varaq, fan daftari", price: 6000 },
      { name: "60 varaq", price: 7500 },
      { name: "80 varaq", price: 9000 },
      { name: "96 varaq, katta", price: 12000 },
      { name: "120 varaq, qalin", price: 16000 },
      { name: "Spiral bloknot", price: 18000 },
      { name: "Matematika daftari", price: 4500 },
      { name: "Til daftari", price: 4500 },
      { name: "Chizmachilik albomi", price: 15000 },
      { name: "Rasm albomi", price: 12000 },
      { name: "Kundalik (dnevnik)", price: 18000 },
      { name: "Nazorat ishi daftari", price: 5000 },
      { name: "Referat qog'ozlari", price: 25000 },
      { name: "Sticky notes", price: 14000 },
      { name: "Millimetrovka qog'ozi", price: 8000 },
      { name: "Yozuv bloknoti", price: 10000 },
      { name: "Lug'at daftari", price: 6500 },
      { name: "Notasiya daftari", price: 9000 }
    ]
  },
  {
    id: 3,
    title: "Yozuv vositalari",
    headerBg: "bg-pink-600 text-white",
    items: [
      { name: "HB grafit qalam", price: 2500 },
      { name: "2B/3B qalam", price: 3000 },
      { name: "Mexanik qalam 0.5mm", price: 12000 },
      { name: "Zapas grafit", price: 5000 },
      { name: "12 rangli qalam", price: 22000 },
      { name: "18 rangli qalam", price: 32000 },
      { name: "24 rangli qalam", price: 45000 },
      { name: "36 rangli qalam", price: 65000 },
      { name: "Ko'k ruchka", price: 2200 },
      { name: "Qora ruchka", price: 2200 },
      { name: "Qizil ruchka", price: 2200 },
      { name: "4 rangli ruchka", price: 8000 },
      { name: "Gel ruchka", price: 3500 },
      { name: "Flomaster, 12 rang", price: 18000 },
      { name: "Flomaster, 24 rang", price: 34000 },
      { name: "Highlighter", price: 14000 },
      { name: "Uchlagich, bir teshikli", price: 3000 },
      { name: "Uchlagich, quticha bilan", price: 6000 },
      { name: "O'chirg'ich, oddiy", price: 2500 },
      { name: "O'chirg'ich, rangli uchun", price: 4000 },
      { name: "Kapillyar ruchkalar", price: 18000 },
      { name: "Kalligrafiya pero", price: 24000 }
    ]
  },
  {
    id: 4,
    title: "Chizish asboblari",
    headerBg: "bg-amber-600 text-white",
    items: [
      { name: "Lineyka, 15 sm", price: 3000 },
      { name: "Lineyka, 20 sm", price: 4500 },
      { name: "Lineyka, 30 sm", price: 6000 },
      { name: "Transportir", price: 4000 },
      { name: "Sirkul", price: 18000 },
      { name: "Sirkul to'plami", price: 35000 },
      { name: "Uchburchak lineyka juftligi", price: 8000 },
      { name: "Geometrik nabor", price: 40000 },
      { name: "Trafaret", price: 7000 },
      { name: "Qalam ushlagich", price: 12000 },
      { name: "Reysmus chizg'ichi", price: 15000 },
      { name: "Lekalo chizg'ichi", price: 14000 }
    ]
  },
  {
    id: 5,
    title: "Bo'yoq va ijodkorlik",
    headerBg: "bg-emerald-600 text-white",
    items: [
      { name: "Guash, 6 rang", price: 16000 },
      { name: "Guash, 12 rang", price: 28000 },
      { name: "Akvarel, 12 rang", price: 20000 },
      { name: "Akvarel, 24 rang", price: 36000 },
      { name: "Cho'tkalar to'plami", price: 18000 },
      { name: "Palitra", price: 8000 },
      { name: "Suv idishi", price: 5000 },
      { name: "Plastilin, 6 rang", price: 12000 },
      { name: "Plastilin, 12 rang", price: 20000 },
      { name: "Rangli qog'oz", price: 10000 },
      { name: "Rangli karton", price: 14000 },
      { name: "Gofrirovka qog'ozi", price: 12000 },
      { name: "Qaychi", price: 9000 },
      { name: "PVA elim", price: 6000 },
      { name: "Qalam elim", price: 5000 },
      { name: "Skotch", price: 4000 },
      { name: "Ikki tomonlama skotch", price: 7000 },
      { name: "Akril bo'yoqlar", price: 38000 }
    ]
  },
  {
    id: 6,
    title: "Sumka va aksessuar",
    headerBg: "bg-blue-600 text-white",
    items: [
      { name: "Ortopedik ryukzak", price: 245000 },
      { name: "Kichik ryukzak", price: 160000 },
      { name: "Sport sumkasi", price: 110000 },
      { name: "Penal, bir qavatli", price: 25000 },
      { name: "Penal, ko'p bo'limli", price: 45000 },
      { name: "Fayl-papka A4", price: 1500 },
      { name: "Ko'p bo'limli papka", price: 28000 },
      { name: "Papka-planshet", price: 22000 },
      { name: "Daftar g'ilofi", price: 1000 },
      { name: "Kundalik g'ilofi", price: 2000 },
      { name: "Kitob g'ilofi", price: 3000 },
      { name: "Kartalar qutisi", price: 15000 },
      { name: "Sumka yomg'irpechi", price: 35000 },
      { name: "Bel sumkasi", price: 65000 }
    ]
  },
  {
    id: 7,
    title: "Elektronika",
    headerBg: "bg-lime-600 text-white",
    items: [
      { name: "Oddiy kalkulyator", price: 35000 },
      { name: "Ilmiy kalkulyator", price: 85000 },
      { name: "Elektron lug'at", price: 140000 },
      { name: "Planshet", price: 1800000 },
      { name: "Noutbuk", price: 3900000 },
      { name: "Simsiz quloqchin", price: 150000 },
      { name: "Quvvat banki", price: 180000 },
      { name: "USB fleshka 32GB", price: 65000 },
      { name: "Stol LED chirog'i", price: 120000 }
    ]
  },
  {
    id: 8,
    title: "Sport buyumlari",
    headerBg: "bg-red-600 text-white",
    items: [
      { name: "Sport formasi", price: 185000 },
      { name: "Krossovka", price: 210000 },
      { name: "Sport sumkasi", price: 110000 },
      { name: "Suzish anjomlari", price: 95000 },
      { name: "Sport butilkasi", price: 45000 },
      { name: "Sport sochiqchasi", price: 35000 },
      { name: "Sakrash arqoni (skakalka)", price: 25000 },
      { name: "Gimnastika gilamchasi", price: 130000 }
    ]
  },
  {
    id: 9,
    title: "Gigiyena va ehtiyoj",
    headerBg: "bg-stone-600 text-white",
    items: [
      { name: "Qo'l antiseptigi", price: 12000 },
      { name: "Salfetka", price: 4000 },
      { name: "Niqob", price: 1000 },
      { name: "Suv butilkasi", price: 65000 },
      { name: "Tushlik qutisi", price: 55000 },
      { name: "Idish-tovoq to'plami", price: 45000 },
      { name: "Tish cho'tkasi qutisi", price: 18000 },
      { name: "Shaxsiy sochiqcha", price: 25000 }
    ]
  },
  {
    id: 10,
    title: "Qo'shimcha aksessuar",
    headerBg: "bg-purple-600 text-white",
    items: [
      { name: "Bolalar soati", price: 120000 },
      { name: "ID-karta", price: 15000 },
      { name: "Kalit bilaguzugi", price: 12000 },
      { name: "Kundalik uchun lenta", price: 8000 },
      { name: "Nishon va shevronlar", price: 10000 },
      { name: "Yorug'lik qaytaruvchi stiker", price: 14000 },
      { name: "Sumka brelogi", price: 18000 }
    ]
  },
  {
    id: 11,
    title: "Fan kabinetlari uchun maxsus",
    headerBg: "bg-cyan-600 text-white",
    items: [
      { name: "Fizika laboratoriya nabori", price: 190000 },
      { name: "Kimyo xavfsizlik ko'zoynagi", price: 45000 },
      { name: "Biologiya mikroskopi", price: 380000 },
      { name: "Geografiya globusi", price: 120000 },
      { name: "O'zbekiston atlas xaritasi", price: 35000 },
      { name: "Jahon siyosiy xaritasi", price: 40000 },
      { name: "Tarixiy kontur xaritalar", price: 18000 },
      { name: "Periodik jadval (Mendeleyev)", price: 15000 }
    ]
  },
  {
    id: 12,
    title: "O'qituvchilar va Sinf rahbarlari uchun",
    headerBg: "bg-teal-600 text-white",
    items: [
      { name: "Sinf jurnali g'ilofi", price: 25000 },
      { name: "Qizil tekshiruv ruchkalari", price: 12000 },
      { name: "Magnit doska markeri", price: 15000 },
      { name: "Doska o'chirg'ich", price: 18000 },
      { name: "Lazer ko'rsatkich (ukazka)", price: 55000 },
      { name: "Sertifikat qog'ozlari", price: 45000 },
      { name: "Baholash stikerlari to'plami", price: 20000 }
    ]
  }
];

export default function MaktabStartApp() {
  // Navigation & Tabs state
  const [activeTab, setActiveTab] = useState<"home" | "megacatalog" | "catalog" | "checklist" | "calculator" | "account">("home");
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const [bgIndex, setBgIndex] = useState(0);
  
  // User Authentication State
  const [user, setUser] = useState<UserAccount>({
    name: "Mirjalol Muhammadkarimov",
    phone: "+998 90 123 45 67",
    role: "Ota-ona",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    isLoggedIn: true,
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // THREE SEPARATE FIELDS AS REQUESTED: Login (with @gmail auto) FIRST at the top, then Phone, then Password
  const [loginUsername, setLoginUsername] = useState("mirjalol_2026@gmail.com");
  const [loginPhone, setLoginPhone] = useState("+998 ");
  const [loginPass, setLoginPass] = useState("");
  const [loginRole, setLoginRole] = useState<"Ota-ona" | "O'quvchi" | "O'qituvchi">("Ota-ona");
  const [showPassword, setShowPassword] = useState(false);

  // Purpose Intro Modal State
  const [showPurposeModal, setShowPurposeModal] = useState(false);

  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[1], quantity: 2 },
  ]);
  const [wishlist, setWishlist] = useState<number[]>([1, 3]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Search & Catalog Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [megaSearchQuery, setMegaSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc">("popular");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Checklist State
  const [checklist, setChecklist] = useState([
    { id: 1, grade: 5, name: "Ergonomik maktab ryukzagi", checked: true, price: 245000, prodId: 1 },
    { id: 2, grade: 5, name: "12 ta umumiy daftar (48 varaq)", checked: true, price: 36000, prodId: 2 },
    { id: 3, grade: 5, name: "Ko'k va qora sharli ruchkalar", checked: false, price: 22000, prodId: 5 },
    { id: 4, grade: 5, name: "Geometrik chizg'ichlar va tsirkul", checked: false, price: 35000, prodId: 4 },
    { id: 5, grade: 5, name: "Maktab formasi va oq ko'ylak", checked: false, price: 120000, prodId: 6 },
    { id: 6, grade: 5, name: "Suv uchun termos idish", checked: false, price: 65000, prodId: 7 },
    { id: 7, grade: 5, name: "Rangli qalamlar va chizmachilik", checked: false, price: 45000, prodId: 3 },
  ]);

  // Budget Calculator State
  const [userBudget, setUserBudget] = useState<number>(300000);

  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // Rotate background images every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % STUDY_BACKGROUNDS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Computed Cart & Wishlist Values
  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const deliveryCost = cartSubtotal > 300000 || cartSubtotal === 0 ? 0 : 25000;
  const cartFinalTotal = cartSubtotal - discountAmount + deliveryCost;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  // Helpers
  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product: Product, count = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + count } : item
        );
      }
      return [...prev, { product, quantity: count }];
    });
    showToast(`✅ "${product.title}" savatga qo'shildi!`);
  };

  // Add Item from 180+ Mega-Catalog directly to cart
  const addMegaItemToCart = (name: string, price: number, categoryName: string) => {
    const megaProduct: Product = {
      id: Math.abs(name.split("").reduce((a, b) => a + b.charCodeAt(0), 0)) + 1000,
      title: name,
      price: price,
      category: categoryName,
      grade: [1, 2, 3, 4, 5, 6, 7],
      rating: 5.0,
      reviews: 54,
      badge: "Mega-Katalog",
      badgeColor: "bg-blue-600",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
      inStock: true,
      description: `${categoryName} bo'limidan ${name} — 100% yuqori sifatli maktab buyumi.`
    };
    addToCart(megaProduct, 1);
  };

  const updateCartQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    showToast(wishlist.includes(id) ? "❌ Sevimlilardan olib tashlandi" : "❤️ Sevimlilarga qo'shildi");
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "MAKTAB2026") {
      setDiscountPercent(15);
      showToast("🎉 MAKTAB2026 kuponi qo'llandi! -15% chegirma");
    } else {
      showToast("⚠️ Kupon kodi xato yoki muddati o'tgan! ('MAKTAB2026' deb yozing)");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const finalLogin = loginUsername.includes("@") ? loginUsername : `${loginUsername}@gmail.com`;
    setUser({
      name: finalLogin ? `Mirjalol (${finalLogin})` : "Mirjalol Muhammadkarimov",
      phone: loginPhone,
      role: loginRole,
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
      isLoggedIn: true,
    });
    setIsLoginModalOpen(false);
    showToast(`🎉 Xush kelibsiz! Akkauntga kirildi (${finalLogin}).`);
  };

  const handleLogout = () => {
    setUser((prev) => ({ ...prev, isLoggedIn: false }));
    showToast("👋 Tizimdan chiqdingiz!");
  };

  // Filtered Products for Catalog & Instant Live Search
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCat = selectedCategory === "Barchasi" || p.category === selectedCategory;
    const matchesGrade = selectedGradeFilter === null || p.grade.includes(selectedGradeFilter);
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesGrade && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return b.rating - a.rating;
  });

  // Automatically switch to Catalog tab if user types in search
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim() !== "" && activeTab !== "catalog") {
      setActiveTab("catalog");
    }
  };

  // Checklist computation
  const completedChecklist = checklist.filter((i) => i.checked).length;
  const checklistProgress = Math.round((completedChecklist / checklist.length) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-600 selection:text-white relative font-sans">
      
      {/* TOP LOGIN & ACCOUNT ANNOUNCEMENT BAR ("LOGIN BO'SIN BOSHIGA") */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-2 px-4 border-b border-slate-800 text-xs font-semibold relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white font-extrabold px-2 py-0.5 rounded text-[10px] uppercase">BOSH SAHIFA LOGIN</span>
            <span className="hidden sm:inline text-slate-300">Maktab buyumlariga buyurtma berish va saqlash uchun:</span>
          </div>
          <div className="flex items-center gap-3">
            {user.isLoggedIn ? (
              <button
                onClick={() => setActiveTab("account")}
                className="bg-white/10 hover:bg-white/20 text-blue-300 hover:text-white px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Akkaunt kabineti: {user.name.split(" ")[0]}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1 rounded-lg transition-all flex items-center gap-1.5 font-bold cursor-pointer shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Tizimga Kirish (Login)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4 HIGH-QUALITY STUDY BACKGROUNDS WITH BLUR OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {STUDY_BACKGROUNDS.map((bgUrl, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 transform scale-105 ${
              bgIndex === idx ? "opacity-30" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${bgUrl}')` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-slate-50/95 to-white/95 backdrop-blur-[6px]" />
      </div>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-fade-in">
          <span className="font-semibold text-sm">{toast}</span>
        </div>
      )}

      {/* ONBOARDING & PURPOSE EXPLANATION MODAL */}
      {showPurposeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-slate-900">MaktabStart'ga Xush Kelibsiz!</h3>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Platforma Maqsadi va Afzalligi</span>
                </div>
              </div>
              <button onClick={() => setShowPurposeModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              <p className="font-bold text-slate-900">
                🎯 Nima maqsadda bu saytga kirdingiz va biz sizga qanday yordam beramiz?
              </p>
              <p>
                Maktab bozorlarida soatlab vaqt yo'qotish, og'ir sumkalarni ko'tarish va har bir fan uchun qanday daftar-qurol kerakligini o'ylash davri o'tdi!
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100 flex gap-3 items-start">
                  <span className="text-xl">👩‍🏫</span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">O'qituvchilar Ro'yxati</h4>
                    <p className="text-xs text-slate-500 mt-0.5">1-7 sinf uchun aniq va tekshirilgan to'plamlar</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex gap-3 items-start">
                  <span className="text-xl">⚡</span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">5 Daqiqada Xarid</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Bitta klik bilan barchasini savatga solib buyurtma berish</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-100 flex gap-3 items-start">
                  <span className="text-xl">💰</span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">50%-gacha Tejamkorlik</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Bozordan arzon ulgurji narxlar va chegirma kuponi</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-100 flex gap-3 items-start">
                  <span className="text-xl">🚚</span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Uyga Yetkazib Berish</h4>
                    <p className="text-xs text-slate-500 mt-0.5">24 soat ichida eshigingizgacha kuryer yetkazadi</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-500">
                💡 Tizimdan to'liq foydalanish va buyurtma kuzatish uchun akkauntingizga kiring!
              </span>
              <button
                onClick={() => {
                  setShowPurposeModal(false);
                  setIsLoginModalOpen(true);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md transition-all shrink-0 cursor-pointer"
              >
                Tushunarli, Boshladik! 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOGIN / ACCOUNT AUTHENTICATION MODAL ("LOGIN BOSHIDA") */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <LogIn className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xl text-slate-900">Kabinetga Kirish / Ro'yxatdan O'tish</h3>
              </div>
              <button onClick={() => setIsLoginModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* FIELD #1 (BOSHIGA): LOGIN / EMAIL WITH AUTO @GMAIL.COM */}
              <div>
                <label className="text-xs font-extrabold text-blue-700 uppercase block mb-1">
                  1. Login / Email (@gmail.com avtomatik qo'shiladi)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="foydalanuvchi_nomi@gmail.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
                <span className="text-[11px] text-blue-600 font-bold mt-1 block">💡 Yozgan nomingiz oxiriga @gmail.com o'zi qo'shib beriladi!</span>
              </div>

              {/* FIELD #2: TELEFON RAQAMI */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1">2. Telefon Raqami</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="+998 (90) 123-45-67"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* FIELD #3: PAROL */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1">3. Parol</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-sm font-semibold outline-none focus:border-blue-500"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[11px] text-slate-400 font-medium mt-1 block">Xavfsiz: Parolingiz shifrlangan holda saqlanadi.</span>
              </div>

              {/* FIELD #4: ROLINGIZ */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1">4. Sizning Rolingiz</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Ota-ona", "O'quvchi", "O'qituvchi"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setLoginRole(r)}
                      className={`py-2.5 px-2 rounded-xl border font-bold text-xs transition-all ${
                        loginRole === r
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {r === "Ota-ona" ? "👨‍👩‍👦" : r === "O'quvchi" ? "🎒" : "👩‍🏫"} {r}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base shadow-xl shadow-blue-500/25 transition-all cursor-pointer mt-2"
              >
                Kirish / Akkaunt Yaratish
              </button>
            </form>
          </div>
        </div>
      )}

      {/* WISHLIST DRAWER / SEVIMLILAR MODALI ("SEVIMLILARGA KIRISH TO'LIQ ISHLAYDI") */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end animate-fade-in">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-slide-in-right">
            {/* Wishlist Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                  <Heart className="w-5 h-5 fill-rose-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Sevimli Mahsulotlar</h3>
                  <span className="text-xs text-slate-500 font-medium">{wishlistProducts.length} ta saqlangan</span>
                </div>
              </div>
              <button onClick={() => setIsWishlistOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Wishlist Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlistProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                  <Heart className="w-16 h-16 stroke-1 mb-3 text-slate-300" />
                  <p className="font-semibold text-base text-slate-600">Sevimlilar ro'yxati hozircha bo'sh</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Mahsulot kartasidagi ❤️ yurakchani bosib sevimli qurollaringizni shu yerda saqlashingiz mumkin!
                  </p>
                  <button
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setActiveTab("catalog");
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
                  >
                    Katalogdan Tanlash
                  </button>
                </div>
              ) : (
                wishlistProducts.map((prod) => (
                  <div key={prod.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="w-16 h-16 rounded-xl bg-white overflow-hidden shadow-sm shrink-0 border border-slate-100">
                        <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">{prod.category}</span>
                        <h4 className="font-semibold text-slate-900 text-sm line-clamp-1 mt-1">{prod.title}</h4>
                        <span className="text-xs font-extrabold text-blue-600 block mt-0.5">{prod.price.toLocaleString()} so'm</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-0 border-slate-200">
                      <button
                        onClick={() => {
                          addToCart(prod, 1);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Savatga</span>
                      </button>
                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-rose-500"
                        title="Sevimlilardan o'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Wishlist Footer */}
            {wishlistProducts.length > 0 && (
              <div className="p-6 border-t border-slate-200 bg-slate-50/50 space-y-3">
                <button
                  onClick={() => {
                    wishlistProducts.forEach((prod) => addToCart(prod, 1));
                    setIsWishlistOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Barcha Sevimlilarni Savatga Qo'shish</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SHOPPING CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end animate-fade-in">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-slide-in-right">
            {/* Cart Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Sizning Savatingiz</h3>
                  <span className="text-xs text-slate-500 font-medium">{cartTotalItems} ta mahsulot bor</span>
                </div>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Delivery Bar */}
            <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-4 border-b border-slate-100">
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>🚚 Yetkazib berish</span>
                <span>{cartSubtotal >= 300000 ? "BEPUL! 🎉" : `${(300000 - cartSubtotal).toLocaleString()} so'm qoldi`}</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, (cartSubtotal / 300000) * 100)}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                  <ShoppingBag className="w-16 h-16 stroke-1 mb-3 text-slate-300" />
                  <p className="font-semibold text-base text-slate-600">Savatingiz hozircha bo'sh</p>
                  <p className="text-xs text-slate-400 mt-1">Katalogdan kerakli qurollarni tanlang</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex gap-3 items-center">
                    <div className="w-14 h-14 rounded-xl bg-white overflow-hidden shadow-sm shrink-0 border border-slate-100">
                      <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 text-sm line-clamp-1">{item.product.title}</h4>
                      <span className="text-xs font-bold text-blue-600 block mt-0.5">{item.product.price.toLocaleString()} so'm</span>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 bg-white border rounded-lg px-1.5 py-0.5 shadow-sm">
                          <button onClick={() => updateCartQuantity(item.product.id, -1)} className="w-6 h-6 rounded hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold">-</button>
                          <span className="w-6 text-center font-bold text-xs text-slate-900">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.product.id, 1)} className="w-6 h-6 rounded hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold">+</button>
                        </div>
                        <button onClick={() => updateCartQuantity(item.product.id, -item.quantity)} className="text-slate-400 hover:text-rose-500 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-200 bg-slate-50/50 space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Kupon kodi (MAKTAB2026)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold uppercase outline-none focus:border-blue-500"
                  />
                  <button onClick={applyCoupon} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold">
                    Qo'llash
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                  <div className="flex justify-between">
                    <span>Mahsulotlar summasi:</span>
                    <span className="font-bold text-slate-900">{cartSubtotal.toLocaleString()} so'm</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Chegirma (-{discountPercent}%):</span>
                      <span>-{discountAmount.toLocaleString()} so'm</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Yetkazib berish:</span>
                    <span className="font-bold text-slate-900">{deliveryCost === 0 ? "BEPUL" : `${deliveryCost.toLocaleString()} so'm`}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-base font-extrabold text-slate-900">
                    <span>Jami to'lov:</span>
                    <span className="text-blue-600 text-xl">{cartFinalTotal.toLocaleString()} so'm</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Buyurtmani Rasmiylashtirish</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xl text-slate-900">Buyurtma Berish</h3>
              </div>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Ismingiz</label>
                <div className="relative">
                  <input type="text" placeholder="Jasur Karimov" defaultValue={user.isLoggedIn ? user.name : "Ota-ona / O'quvchi"} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold outline-none focus:border-blue-500" />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Telefon Raqam</label>
                <div className="relative">
                  <input type="text" placeholder="+998 (90) 123-45-67" defaultValue={user.isLoggedIn ? user.phone : "+998 "} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold outline-none focus:border-blue-500" />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Manzil / Shahar</label>
                <div className="relative">
                  <input type="text" placeholder="Toshkent sh., Yunusobod tumani..." defaultValue="Toshkent shahri" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold outline-none focus:border-blue-500" />
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-2">To'lov Usulini Tanlang</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Naqd (COD)", "Click", "Payme"].map((method, idx) => (
                    <button key={idx} type="button" className={`py-3 px-2 rounded-xl border font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all ${idx === 0 ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"}`}>
                      <span>{idx === 0 ? "💵" : idx === 1 ? "🔵" : "🟢"}</span>
                      <span>{method}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
              <span className="font-semibold text-sm text-slate-600">Jami to'lov summasi:</span>
              <span className="font-extrabold text-xl text-blue-600">{cartFinalTotal.toLocaleString()} so'm</span>
            </div>

            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setIsSuccessOpen(true);
                setCart([]);
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-base shadow-xl shadow-emerald-500/25 transition-all"
            >
              🎉 Buyurtmani Tasdiqlash
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS CELEBRATION MODAL */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center space-y-6 shadow-2xl border border-slate-200 animate-scale-up">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-10 h-10 animate-bounce" />
            </div>
            <div>
              <span className="bg-emerald-50 text-emerald-600 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                Muvaffaqiyatli! #M-2026
              </span>
              <h3 className="font-extrabold text-2xl text-slate-900 mt-2">Buyurtmangiz Qabul Qilindi!</h3>
              <p className="text-sm text-slate-600 mt-2">
                Tabriklaymiz! Sizning buyurtmangiz kuryer va omborxona bo'limiga yuborildi. 24 soat ichida yetkazib beramiz.
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl text-left space-y-2 border border-slate-100 text-xs text-slate-600 font-medium">
              <div className="flex justify-between"><span>Yetkazish manzili:</span><span className="font-bold text-slate-900">Toshkent shahri</span></div>
              <div className="flex justify-between"><span>Kuryer aloqasi:</span><span className="font-bold text-emerald-600">+998 (71) 200-00-00</span></div>
            </div>
            <button
              onClick={() => setIsSuccessOpen(false)}
              className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-lg transition-all"
            >
              Bosh Sahifaga Qaytish
            </button>
          </div>
        </div>
      )}

      {/* STICKY GLASS NAVBAR WITH LIVE INSTANT SEARCH & USER ACCOUNT */}
      <header className="sticky top-0 z-40 glass-nav transition-all border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div onClick={() => { setActiveTab("home"); setSearchQuery(""); }} className="flex items-center gap-3 cursor-pointer group shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Maktab<span className="text-blue-600">Start</span>
              </span>
              <span className="block text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                1-7 Sinf Bozori
              </span>
            </div>
          </div>

          {/* LIVE INSTANT SEARCH INPUT */}
          <div className="flex-1 max-w-md hidden sm:block relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-blue-600 absolute left-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInput}
                placeholder="Ruchka, daftar, ryukzak, 1-sinf deb yozing..."
                className="w-full bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-slate-200/60 focus:border-blue-500 rounded-2xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 outline-none font-medium transition-all shadow-inner"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Nav Tabs (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 font-semibold text-xs">
            {[
              { id: "home", label: "🏠 Asosiy" },
              { id: "megacatalog", label: "📦 180+ Mega-Katalog" },
              { id: "catalog", label: "🛍️ Rasmli Do'kon" },
              { id: "checklist", label: "📝 Checklist" },
              { id: "calculator", label: "🧮 Kalkulyator" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  if (tab.id === "home") setSearchQuery("");
                }}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* User Account & Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowPurposeModal(true)}
              className="w-9 h-9 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition-colors font-bold text-xs shadow-sm"
              title="Sayt maqsadi va afzalligi"
            >
              <Info className="w-4 h-4" />
            </button>

            {user.isLoggedIn ? (
              <button
                onClick={() => {
                  setActiveTab("account");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`px-3 py-1.5 rounded-full border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer shadow-sm ${
                  activeTab === "account" ? "bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-500/30" : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
                }`}
              >
                <img src={user.avatar} alt="User Avatar" className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-300 shadow-sm shrink-0" />
                <span className="max-w-[110px] truncate font-extrabold">{user.name.split(" ")[0]}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kirish</span>
              </button>
            )}

            {/* SEVIMLILAR / WISHLIST BUTTON (OPENS MODAL DRAWER) */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative w-9 h-9 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
              title="Sevimli mahsulotlar"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all active:scale-95 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Savat</span>
              <span className="bg-white text-blue-600 font-extrabold text-[11px] px-1.5 py-0.5 rounded-full shadow-inner">
                {cartTotalItems}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Live Search Input */}
        <div className="sm:hidden px-4 pb-3">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-blue-600 absolute left-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInput}
              placeholder="Ruchka, daftar, ryukzak, 1-sinf deb yozing..."
              className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-10 py-2 text-xs text-slate-800 outline-none font-medium"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Nav Tabs */}
        <div className="lg:hidden border-t border-slate-200 bg-white/95 px-4 py-2 flex items-center justify-around overflow-x-auto text-xs font-bold text-slate-700 gap-1.5">
          <button onClick={() => { setActiveTab("home"); setSearchQuery(""); }} className={`px-2.5 py-1.5 rounded-lg ${activeTab === "home" ? "bg-blue-600 text-white" : "bg-slate-100"}`}>🏠 Asosiy</button>
          <button onClick={() => setActiveTab("megacatalog")} className={`px-2.5 py-1.5 rounded-lg ${activeTab === "megacatalog" ? "bg-blue-600 text-white" : "bg-slate-100"}`}>📦 Mega-Katalog</button>
          <button onClick={() => setActiveTab("catalog")} className={`px-2.5 py-1.5 rounded-lg ${activeTab === "catalog" ? "bg-blue-600 text-white" : "bg-slate-100"}`}>🛍️ Do'kon</button>
          <button onClick={() => setActiveTab("checklist")} className={`px-2.5 py-1.5 rounded-lg ${activeTab === "checklist" ? "bg-blue-600 text-white" : "bg-slate-100"}`}>📝 Checklist</button>
          <button onClick={() => setActiveTab("calculator")} className={`px-2.5 py-1.5 rounded-lg ${activeTab === "calculator" ? "bg-blue-600 text-white" : "bg-slate-100"}`}>🧮 Kalkulyator</button>
        </div>
      </header>

      {/* MAIN VIEW CONTENTS */}
      <main className="flex-1 relative z-10">
        
        {/* ========================================================================= */}
        {/* TAB 1: HOME & GRADE ASSISTANT */}
        {/* ========================================================================= */}
        {activeTab === "home" && (
          <div className="animate-fade-in">
            <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl mb-12 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="space-y-3 max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-blue-500/30 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      <span>✨ O'zbekistonda #1 Maktab Buyumlari Bozori</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight flex items-center gap-3">
                      <span>{user.isLoggedIn ? `Assalomu alaykum, ${user.name}!` : "Assalomu alaykum, Hurmatli Ota-ona va O'quvchilar!"}</span>
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
                      MaktabStart'ga xush kelibsiz! Bizning maqsadimiz — farzandingizni 1–7 sinfgacha tayyorlashda bozorlarda soatlab sarson bo'lishingizning oldini olish. O'qituvchilar tomonidan tasdiqlangan eng sifatli daftarlar, qalamlar va ryukzaklarni 1 klik bilan arzon narxda uyga buyurtma bering!
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-center shrink-0 w-full md:w-72 space-y-4 shadow-2xl">
                    <div className="relative w-22 h-22 rounded-full overflow-hidden mx-auto shadow-xl ring-4 ring-white/30 bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                      <img src={user.avatar} alt="Mirjalol Photo" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 font-bold text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{user.role} • tasdiqlangan</span>
                      </span>
                      <h4 className="font-extrabold text-white text-base tracking-tight">{user.name}</h4>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab("account");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="w-full py-3 rounded-xl bg-white text-slate-900 font-extrabold text-xs hover:bg-blue-50 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Kabinetga o'tish</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-center max-w-4xl mx-auto space-y-6">
                  <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                    Sinfingizni tanlang va maktabga{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">
                      5 daqiqada
                    </span>{" "}
                    tayyor bo'ling!
                  </h2>

                  <p className="text-lg sm:text-xl text-slate-700 font-semibold max-w-2xl mx-auto">
                    Vaqtingizni bozorlarda o'tkazmang — tayyor o'quv qurollari ro'yxatini ko'ring va eshigingizgacha kuryerda qabul qiling!
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => setActiveTab("megacatalog")}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-xl flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-slate-700"
                    >
                      <Layers className="w-5 h-5 text-amber-400" />
                      <span>📦 180+ Mega Katalog (Barcha Turlar)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        const el = document.getElementById("grade-assistant-section");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-base shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                      <GraduationCap className="w-5 h-5" />
                      <span>Sinf bo'yicha yig'ish</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("catalog")}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/90 hover:bg-white text-slate-900 font-bold text-base border border-slate-300 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>🛍️ 16+ Rasmli Do'kon</span>
                    </button>
                  </div>
                </div>

                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                  {[
                    { icon: Truck, title: "1 Kunda Yetkazish", desc: "Toshkent va viloyatlarga tezkor kuryer", color: "text-blue-600 bg-blue-50/90" },
                    { icon: ShieldCheck, title: "100% Sifat Kafolati", desc: "Faqat tekshirilgan brend mahsulotlar", color: "text-emerald-600 bg-emerald-50/90" },
                    { icon: Sparkles, title: "50%-gacha Tejamkorlik", desc: "To'plam olganda maxsus chegirma", color: "text-purple-600 bg-purple-50/90" },
                    { icon: Package, title: "Qulay To'lov", desc: "Qabul qilganda naqd yoki Payme/Click", color: "text-amber-600 bg-amber-50/90" },
                  ].map((item, idx) => (
                    <div key={idx} className="glass-card rounded-2xl p-5 text-left flex flex-col justify-between">
                      <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-3 shadow-sm`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                        <p className="text-xs text-slate-600 font-medium mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* GRADE ASSISTANT SECTION */}
            <section id="grade-assistant-section" className="py-16 md:py-24 bg-white/90 backdrop-blur-md border-y border-slate-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="text-blue-600 font-bold text-xs sm:text-sm tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
                    ✨ Smart Grade Assistant
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                    Sinfingizni tanlang — biz tayyor ro'yxatni ko'rsatamiz!
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
                    O'qituvchilar tavsiyasiga ko'ra tuzilgan maxsus paketlar. Keraklisini qo'shing yoki barchasini 1 klikda oling.
                  </p>
                </div>

                <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 pt-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((grade) => {
                    const isActive = selectedGrade === grade;
                    return (
                      <button
                        key={grade}
                        onClick={() => setSelectedGrade(grade)}
                        className={`px-6 py-3.5 rounded-2xl font-extrabold text-sm sm:text-base whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
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

                <div className={`mt-8 rounded-3xl p-6 sm:p-8 lg:p-10 bg-gradient-to-br ${GRADE_PACKAGES[selectedGrade].bg} border shadow-xl relative overflow-hidden animate-fade-in`}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-6">
                      <div>
                        <div className="inline-flex items-center gap-2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm mb-3">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Tayyor To'plam • 54 ta buyum ichida</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                          {GRADE_PACKAGES[selectedGrade].title}
                        </h3>
                        <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
                          Shu sinf uchun yil davomida kerak bo'ladigan barcha daftarlar, qalamlar, geometriya qurollari va ryukzak.
                        </p>
                      </div>

                      <div className="space-y-3 bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                          To'plam tarkibi:
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {GRADE_PACKAGES[selectedGrade].items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-800 font-bold">
                              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-100 flex flex-col justify-between h-full">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          To'plam uchun maxsus narx
                        </span>
                        <div className="mt-2 flex items-baseline gap-3">
                          <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                            {GRADE_PACKAGES[selectedGrade].price.toLocaleString()}{" "}
                            <span className="text-sm sm:text-base font-normal text-slate-500">so'm</span>
                          </span>
                          <span className="text-base sm:text-lg text-slate-400 line-through font-semibold">
                            {GRADE_PACKAGES[selectedGrade].oldPrice.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>Siz {(GRADE_PACKAGES[selectedGrade].oldPrice - GRADE_PACKAGES[selectedGrade].price).toLocaleString()} so'm tejaysiz!</span>
                        </p>
                      </div>

                      <div className="mt-8 space-y-3">
                        <button
                          onClick={() => {
                            addToCart(PRODUCTS[0], 1);
                            addToCart(PRODUCTS[1], 3);
                            addToCart(PRODUCTS[2], 1);
                            setIsCartOpen(true);
                          }}
                          className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          <span>Barchasini Savatga Qo'shish</span>
                        </button>
                        <button onClick={() => setActiveTab("catalog")} className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors cursor-pointer">
                          Tarkibni o'zgartirish
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* POPULAR CATEGORIES */}
            <section className="py-16 bg-slate-50/90 backdrop-blur-md">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Mashhur Kategoriyalar
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base mt-1 font-medium">
                      Barcha turdagi maktab qurollari va aksessuarlar katalogi
                    </p>
                  </div>
                  <button onClick={() => setActiveTab("megacatalog")} className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer">
                    Barcha 180+ turlarni ko'rish <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { name: "Maktab Sumkalari", count: 124, icon: Package, color: "bg-blue-50 text-blue-600" },
                    { name: "Daftarlar", count: 310, icon: BookOpen, color: "bg-emerald-50 text-emerald-600" },
                    { name: "Qalamlar", count: 450, icon: PenTool, color: "bg-purple-50 text-purple-600" },
                    { name: "Geometriya", count: 85, icon: Compass, color: "bg-amber-50 text-amber-600" },
                    { name: "Forma", count: 190, icon: GraduationCap, color: "bg-rose-50 text-rose-600" },
                    { name: "Aksessuarlar", count: 220, icon: Sparkles, color: "bg-cyan-50 text-cyan-600" },
                  ].map((cat, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setActiveTab("megacatalog");
                      }}
                      className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
                        <cat.icon className="w-7 h-7" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-1">
                        {cat.name}
                      </h3>
                      <span className="text-xs text-slate-400 mt-1 font-semibold">{cat.count} ta mahsulot</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: 180+ MEGA-KATALOG */}
        {/* ========================================================================= */}
        {activeTab === "megacatalog" && (
          <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="max-w-7xl mx-auto space-y-10">
              
              <div className="text-center max-w-4xl mx-auto space-y-3">
                <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest inline-block">
                  📦 Rekonfiguratsiya qilingan — 3 qatorli zamonaviy ustun
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                  To'liq mahsulotlar katalogi
                </h1>
                <p className="text-base sm:text-lg font-bold text-slate-400">
                  12 kategoriya, 180 dan ortiq mahsulot turi (Istalgan tugmani bosing — savatga tushadi!)
                </p>

                <div className="pt-4 max-w-xl mx-auto relative">
                  <div className="relative flex items-center">
                    <Search className="w-5 h-5 text-blue-400 absolute left-4" />
                    <input
                      type="text"
                      value={megaSearchQuery}
                      onChange={(e) => setMegaSearchQuery(e.target.value)}
                      placeholder="180+ tur ichidan qidirish (masalan: sirkul, flomaster, kostyum)..."
                      className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-white placeholder-slate-500 outline-none font-medium shadow-2xl transition-all"
                    />
                    {megaSearchQuery && (
                      <button onClick={() => setMegaSearchQuery("")} className="absolute right-4 text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MEGA_CATALOG_DATA.map((cat) => {
                  const filteredCatItems = cat.items.filter((item) =>
                    megaSearchQuery.trim() === "" ||
                    item.name.toLowerCase().includes(megaSearchQuery.toLowerCase()) ||
                    cat.title.toLowerCase().includes(megaSearchQuery.toLowerCase())
                  );

                  if (megaSearchQuery.trim() !== "" && filteredCatItems.length === 0) {
                    return null;
                  }

                  return (
                    <div
                      key={cat.id}
                      className="bg-slate-900/90 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between transition-all hover:border-slate-700"
                    >
                      <div className={`${cat.headerBg} py-3.5 px-5 font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-between shadow-md`}>
                        <span>{cat.title}</span>
                        <span className="bg-black/25 px-2.5 py-0.5 rounded-full text-xs font-bold">
                          {filteredCatItems.length} ta
                        </span>
                      </div>

                      <div className="p-4 sm:p-5 flex flex-wrap gap-2 flex-1 items-start">
                        {filteredCatItems.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => addMegaItemToCart(item.name, item.price, cat.title)}
                            className="bg-slate-800 hover:bg-slate-700 active:bg-blue-600 text-slate-200 hover:text-white border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm hover:scale-105 cursor-pointer group"
                            title={`${item.price.toLocaleString()} so'm — Savatga qo'shish`}
                          >
                            <span>{item.name}</span>
                            <Plus className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                          </button>
                        ))}
                      </div>

                      <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-900/50 flex items-center justify-between text-xs text-slate-400 font-semibold">
                        <span>💡 Bosing va savatingizga soling</span>
                        <span className="text-blue-400 font-bold">O'zbekiston standartlari</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CATALOG & FILTERS */}
        {/* ========================================================================= */}
        {activeTab === "catalog" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
            {searchQuery && (
              <div className="bg-blue-600 text-white p-4 rounded-2xl mb-6 shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 animate-pulse" />
                  <span className="font-bold text-sm sm:text-base">
                    "{searchQuery}" bo'yicha qidiruv natijalari: <strong className="underline">{filteredProducts.length} ta mahsulot topildi</strong>
                  </span>
                </div>
                <button onClick={() => setSearchQuery("")} className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold">
                  Tozalash ✕
                </button>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-64 space-y-6 shrink-0 bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 shadow-sm h-fit">
                <div className="flex items-center justify-between border-b pb-4">
                  <span className="font-extrabold text-base text-slate-900 flex items-center gap-2"><Filter className="w-4 h-4 text-blue-600" /> Filtrlar</span>
                  <button onClick={() => { setSelectedCategory("Barchasi"); setSelectedGradeFilter(null); setSearchQuery(""); }} className="text-xs font-bold text-rose-500 hover:underline cursor-pointer">Tozalash</button>
                </div>

                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">Kategoriyalar</h4>
                  <div className="space-y-1.5">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${selectedCategory === cat ? "bg-blue-600 text-white shadow-sm" : "text-slate-700 hover:bg-slate-100"}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">Sinf bo'yicha</h4>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 4, 5, 6, 7].map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGradeFilter(selectedGradeFilter === g ? null : g)}
                        className={`py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${selectedGradeFilter === g ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"}`}
                      >
                        {g}-sinf
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
                  <span className="font-bold text-sm text-slate-700">Ko'rsatilmoqda: <strong className="text-blue-600">{filteredProducts.length}</strong> ta mahsulot</span>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                      <button
                        onClick={() => setViewMode("list")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600"}`}
                        title="Qatorma-qator (List view)"
                      >
                        <List className="w-4 h-4" />
                        <span className="hidden sm:inline">Qatorma-qator</span>
                      </button>
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${viewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600"}`}
                        title="Jadval (Grid view)"
                      >
                        <Grid className="w-4 h-4" />
                        <span className="hidden sm:inline">Jadval</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 hidden md:inline">Saralash:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                      >
                        <option value="popular">🔥 Ommabopligi</option>
                        <option value="price-asc">💵 Arzonroq oldin</option>
                        <option value="price-desc">💎 Qimmatroq oldin</option>
                      </select>
                    </div>
                  </div>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 shadow-sm">
                    <Search className="w-16 h-16 text-slate-300 mx-auto stroke-1" />
                    <h3 className="font-extrabold text-xl text-slate-800">Hech narsa topilmadi...</h3>
                    <p className="text-sm text-slate-500 max-w-md mx-auto">
                      Qidiruv so'zini yoki tanlangan kategoriyani o'zgartirib ko'ring (Masalan: ruchka, daftar, ryukzak).
                    </p>
                    <button onClick={() => { setSearchQuery(""); setSelectedCategory("Barchasi"); setSelectedGradeFilter(null); }} className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow">
                      Barcha mahsulotlarni ko'rish
                    </button>
                  </div>
                ) : viewMode === "list" ? (
                  <div className="space-y-4">
                    {filteredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-soft hover:shadow-hover transition-all flex flex-col sm:flex-row items-center justify-between gap-6 group"
                      >
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-50 overflow-hidden border border-slate-200 shrink-0 shadow-sm relative">
                            <img src={prod.image} alt={prod.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            {prod.badge && <span className={`absolute top-2 left-2 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm ${prod.badgeColor}`}>{prod.badge}</span>}
                          </div>
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-bold">{prod.category}</span>
                              <span className="text-xs text-slate-400 font-medium">Sinflar: {prod.grade.join(", ")}-sinf</span>
                            </div>
                            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-blue-600 transition-colors line-clamp-1">{prod.title}</h3>
                            <p className="text-xs text-slate-500 line-clamp-2 font-medium max-w-md">{prod.description}</p>
                            <div className="flex items-center gap-1 text-amber-500 font-extrabold text-xs pt-1">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span>{prod.rating}</span>
                              <span className="text-slate-400 font-normal">({prod.reviews} ta sharh)</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-0 border-slate-100 gap-3">
                          <div className="text-left sm:text-right">
                            {prod.oldPrice && <span className="text-xs text-slate-400 line-through block font-semibold">{prod.oldPrice.toLocaleString()} so'm</span>}
                            <span className="text-xl font-extrabold text-slate-900">{prod.price.toLocaleString()} <span className="text-xs font-normal text-slate-500">so'm</span></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleWishlist(prod.id)}
                              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-rose-500 flex items-center justify-center transition-colors cursor-pointer"
                            >
                              <Heart className={`w-5 h-5 ${wishlist.includes(prod.id) ? "text-rose-500 fill-rose-500" : ""}`} />
                            </button>
                            <button
                              onClick={() => addToCart(prod, 1)}
                              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                            >
                              <Plus className="w-4 h-4 stroke-[3]" />
                              <span>Savatga</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((prod) => (
                      <div key={prod.id} className="group bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col justify-between relative">
                        <div className="relative aspect-square w-full rounded-xl bg-slate-50 overflow-hidden mb-4 border border-slate-200 shadow-inner">
                          <img src={prod.image} alt={prod.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          {prod.badge && <span className={`absolute top-3 left-3 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-sm ${prod.badgeColor}`}>{prod.badge}</span>}
                          <button
                            onClick={() => toggleWishlist(prod.id)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur text-slate-600 hover:text-rose-500 flex items-center justify-center shadow-sm transition-colors cursor-pointer"
                          >
                            <Heart className={`w-4 h-4 ${wishlist.includes(prod.id) ? "text-rose-500 fill-rose-500" : ""}`} />
                          </button>
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-semibold">
                            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[11px] font-bold">{prod.category}</span>
                            <div className="flex items-center gap-1 text-amber-500 font-extrabold">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span>{prod.rating}</span>
                            </div>
                          </div>
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">{prod.title}</h3>
                          <p className="text-xs text-slate-500 line-clamp-2 font-medium mb-3">{prod.description}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                          <div>
                            {prod.oldPrice && <span className="text-xs text-slate-400 line-through block font-medium">{prod.oldPrice.toLocaleString()} so'm</span>}
                            <span className="text-lg font-extrabold text-slate-900">{prod.price.toLocaleString()} <span className="text-xs font-normal text-slate-500">so'm</span></span>
                          </div>
                          <button onClick={() => addToCart(prod, 1)} className="w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer">
                            <Plus className="w-6 h-6 stroke-[3]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SCHOOL CHECKLIST */}
        {/* ========================================================================= */}
        {activeTab === "checklist" && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden mb-8">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs px-3.5 py-1.5 rounded-full inline-block mb-4">
                ☑ Interaktiv Maktab Checklisti
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Hech narsa yoddan chiqmasligi uchun ro'yxat!</h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2 font-medium">Uydagi bor qurollarni belgilab chiqing. Biz yetishmayotganlarini aniqlab, darhol savatingizga qo'shish imkonini beramiz.</p>

              <div className="mt-6 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
                <span className="font-bold text-sm text-slate-200">Tayyorgarlik darajasi:</span>
                <span className="text-sm font-extrabold text-emerald-400">{checklistProgress}% ({completedChecklist} / {checklist.length} ta tayyor)</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mt-3">
                <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500" style={{ width: `${checklistProgress}%` }} />
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900 border-b pb-4">Maktab buyumlari ro'yxati (Bosing va belgilang):</h3>
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setChecklist((prev) => prev.map((i) => i.id === item.id ? { ...i, checked: !i.checked } : i))}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      item.checked ? "bg-emerald-50/80 border-emerald-300 text-emerald-900" : "bg-white border-slate-200 text-slate-800 hover:border-blue-400 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${item.checked ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 bg-slate-50"}`}>
                        {item.checked && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                      <span className={`font-bold text-base ${item.checked ? "line-through text-slate-400" : ""}`}>{item.name}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-slate-500">{item.price.toLocaleString()} so'm</span>
                      {!item.checked && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const p = PRODUCTS.find((prod) => prod.id === item.prodId) || PRODUCTS[0];
                            addToCart(p, 1);
                            setChecklist((prev) => prev.map((i) => i.id === item.id ? { ...i, checked: true } : i));
                          }}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-extrabold text-xs hover:bg-blue-700 shadow-sm transition-all"
                        >
                          + Savatga
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: BUDGET CALCULATOR */}
        {/* ========================================================================= */}
        {activeTab === "calculator" && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 border border-slate-200 shadow-xl space-y-8">
              <div className="text-center max-w-xl mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/25">
                  <Calculator className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">🧮 Smart Byudjet Kalkulyatori</h2>
                <p className="text-slate-600 text-sm mt-2 font-medium">Rejalashtirgan byudjetingizni kiritish orqali eng optimal maktab to'plamini avtomatik hisoblab oling!</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-extrabold text-base text-slate-800">Sizning byudjetingiz:</label>
                  <span className="text-2xl font-extrabold text-blue-600 bg-white px-4 py-1.5 rounded-xl border shadow-sm">{userBudget.toLocaleString()} so'm</span>
                </div>
                <input
                  type="range"
                  min="150000"
                  max="600000"
                  step="25000"
                  value={userBudget}
                  onChange={(e) => setUserBudget(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>150,000 so'm (Minimal)</span>
                  <span>350,000 so'm (O'rtacha)</span>
                  <span>600,000 so'm (Premium)</span>
                </div>
              </div>

              <div className="border border-blue-200 bg-blue-50/50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Tavsiya etilgan to'plam</span>
                  <h3 className="font-extrabold text-xl text-slate-900">
                    {userBudget < 260000 ? "1-Sinf Boshlang'ich To'plami" : userBudget < 350000 ? "4-Sinf Standart To'plami" : "7-Sinf Premium VIP To'plami"}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">Byudjetingizga 100% mos keladi va yetkazib berish bepul bo'ladi!</p>
                </div>
                <button
                  onClick={() => {
                    addToCart(PRODUCTS[0], 1);
                    addToCart(PRODUCTS[1], 2);
                    setIsCartOpen(true);
                  }}
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 shrink-0 cursor-pointer"
                >
                  Savatga Qo'shish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: USER ACCOUNT / KABINET (PREMIUM STRIPE / APPLE / LINEAR REDESIGN) */}
        {/* ========================================================================= */}
        {activeTab === "account" && (
          <div className="min-h-screen bg-slate-100/80 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
              
              {/* 1. PROFILE HEADER CARD */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-900/5 dark:shadow-none transition-all">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  
                  {/* Real Avatar + Dominant Name + Verified Pill Badge */}
                  <div className="flex items-center gap-5">
                    <div className="relative shrink-0">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-indigo-500/20 dark:ring-indigo-400/20 shadow-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-2xl">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <span>{user.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</span>
                        )}
                      </div>
                      <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center shadow-sm" title="Faol foydalanuvchi">
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{user.role} • tasdiqlangan</span>
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                          ID: #MK-2026
                        </span>
                      </div>

                      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                        {user.name}
                      </h1>

                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                        <Phone className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span>{user.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Quiet Ghost Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm shrink-0"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Tizimdan chiqish</span>
                  </button>
                </div>
              </div>

              {/* 2. STATS ROW (3 DISTINCT HIERARCHICAL CARDS WITH STAGGER & HOVER LIFT) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                
                {/* Card 1: Active Orders (Indigo Wash) */}
                <div className="bg-gradient-to-br from-indigo-50/90 via-blue-50/40 to-white dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900 rounded-3xl p-6 border border-indigo-200/60 dark:border-indigo-800/50 shadow-md shadow-indigo-500/5 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                      Faol buyurtmalar
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white block">
                      2 ta
                    </span>
                    <span className="text-xs text-indigo-600/80 dark:text-indigo-400 font-semibold mt-1 block">
                      Yetkazish jarayonida 🚚
                    </span>
                  </div>
                </div>

                {/* Card 2: Saved Wishlist Items (Rose Wash - Clickable) */}
                <div
                  onClick={() => setIsWishlistOpen(true)}
                  className="bg-gradient-to-br from-rose-50/90 via-pink-50/40 to-white dark:from-rose-950/40 dark:via-slate-900 dark:to-slate-900 rounded-3xl p-6 border border-rose-200/60 dark:border-rose-800/50 shadow-md shadow-rose-500/5 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out cursor-pointer group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-rose-700 dark:text-rose-300">
                      Sevimli mahsulotlar
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/25 group-hover:scale-105 transition-transform">
                      <Heart className="w-5 h-5 fill-white" />
                    </div>
                  </div>
                  <div>
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white block">
                      {wishlist.length} ta
                    </span>
                    <span className="text-xs text-rose-600/80 dark:text-rose-400 font-semibold mt-1 flex items-center gap-1">
                      <span>Ro'yxatni ochish</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Card 3: Bonus Ballar (HIGHLIGHTED MOST VALUABLE ACTION - Amber/Gold Accent) */}
                <div className="bg-gradient-to-br from-amber-50/95 via-orange-50/50 to-white dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 rounded-3xl p-6 border-2 border-amber-400/80 dark:border-amber-500/60 shadow-lg shadow-amber-500/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                        Bonus ballaringiz
                      </span>
                      <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                        VIP ✨
                      </span>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-600 dark:text-amber-400 block">
                      150 Ball
                    </span>
                    <span className="text-xs text-amber-700/80 dark:text-amber-300 font-semibold mt-1 block">
                      Keyingi xaridda 15,000 so'm chegirma
                    </span>
                  </div>
                </div>

              </div>

              {/* 3. ORDER HISTORY SECTION (STRUCTURED ELEVATED CARDS WITH STATUS PILLS) */}
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      So'nggi buyurtmalar tarixi
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      Barcha amaldagi va yakunlangan buyurtmalar haqida ma'lumot
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl">
                    Jami: 3 ta buyurtma
                  </span>
                </div>

                <div className="space-y-3.5">
                  {/* Order Card 1 (Active / In Transit) */}
                  <div
                    onClick={() => showToast("📦 Buyurtma #M-2026-001: Kuryer Toshkent shahar bo'yicha yo'lga chiqdi.")}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:border-indigo-400/60 dark:hover:border-indigo-600 hover:shadow-xl transition-all duration-200 ease-out cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0 font-bold">
                        <Truck className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                            #M-2026-001 • 14-Iyul, 2026
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Kuryer yo'lda 🚚</span>
                          </span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          1-Sinf Boshlang'ich to'plami (54 ta buyum)
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                          To'lov: Naqd kuryerga qabul qilinganda (COD)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800 gap-4">
                      <div className="text-left sm:text-right">
                        <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">
                          Jami summasi
                        </span>
                        <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                          245,000 <span className="text-xs font-normal text-slate-500">so'm</span>
                        </span>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-600 group-hover:text-white text-slate-400 flex items-center justify-center transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Order Card 2 (Delivered) */}
                  <div
                    onClick={() => showToast("✅ Buyurtma #M-2026-002 allaqachon muvaffaqiyatli yetkazilgan.")}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:border-indigo-400/60 dark:hover:border-indigo-600 hover:shadow-xl transition-all duration-200 ease-out cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0 font-bold">
                        <CheckSquare className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                            #M-2026-002 • 10-Iyul, 2026
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs">
                            <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
                            <span>Yetkazilgan ✅</span>
                          </span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          48-Varaqli daftarlar to'plami va ortopedik ryukzak
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                          To'lov: Click orqali to'langan
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800 gap-4">
                      <div className="text-left sm:text-right">
                        <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">
                          Jami summasi
                        </span>
                        <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                          155,000 <span className="text-xs font-normal text-slate-500">so'm</span>
                        </span>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-600 group-hover:text-white text-slate-400 flex items-center justify-center transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Order Card 3 (Delivered) */}
                  <div
                    onClick={() => showToast("✅ Buyurtma #M-2026-003 allaqachon muvaffaqiyatli yetkazilgan.")}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:border-indigo-400/60 dark:hover:border-indigo-600 hover:shadow-xl transition-all duration-200 ease-out cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20 shrink-0 font-bold">
                        <PenTool className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                            #M-2026-003 • 05-Iyul, 2026
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs">
                            <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
                            <span>Yetkazilgan ✅</span>
                          </span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          Maped ColorPeps 24-Rangli Qalamlar va Chizmachilik Albomi
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                          To'lov: Payme orqali to'langan
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800 gap-4">
                      <div className="text-left sm:text-right">
                        <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">
                          Jami summasi
                        </span>
                        <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                          60,000 <span className="text-xs font-normal text-slate-500">so'm</span>
                        </span>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-600 group-hover:text-white text-slate-400 flex items-center justify-center transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto font-sans relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-extrabold text-lg mb-4">
              <GraduationCap className="w-6 h-6 text-blue-500" />
              <span>MaktabStart</span>
            </div>
            <p className="text-sm text-slate-400 font-medium">
              1–7 sinf o'quvchilari uchun O'zbekistondagi eng chiroyli va tezkor onlayn maktab buyumlari bozori.
            </p>
            <p className="text-xs text-slate-500 mt-4 font-bold">© 2026 MaktabStart startup loyihasi.</p>
          </div>

          <div>
            <h4 className="text-white font-extrabold text-sm mb-4 uppercase tracking-wider">Kategoriyalar</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><button onClick={() => { setActiveTab("megacatalog"); }} className="hover:text-white transition-colors cursor-pointer">📦 180+ Mega-Katalog</button></li>
              <li><button onClick={() => { setSelectedCategory("Maktab Sumkalari"); setActiveTab("catalog"); }} className="hover:text-white transition-colors cursor-pointer">Maktab Ryukzaklari</button></li>
              <li><button onClick={() => { setSelectedCategory("Daftarlar"); setActiveTab("catalog"); }} className="hover:text-white transition-colors cursor-pointer">Daftarlar va Albomlar</button></li>
              <li><button onClick={() => { setSelectedCategory("Qalamlar"); setActiveTab("catalog"); }} className="hover:text-white transition-colors cursor-pointer">Qalamlar va Ruchkalar</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-extrabold text-sm mb-4 uppercase tracking-wider">Mijozlarga yordam</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><button onClick={() => setIsWishlistOpen(true)} className="hover:text-white transition-colors cursor-pointer">❤️ Sevimli Mahsulotlar</button></li>
              <li><button onClick={() => setActiveTab("checklist")} className="hover:text-white transition-colors cursor-pointer">Interaktiv Maktab Checklist</button></li>
              <li><button onClick={() => setActiveTab("calculator")} className="hover:text-white transition-colors cursor-pointer">Byudjet Kalkulyatori</button></li>
              <li><a href="#grade-assistant-section" className="hover:text-white transition-colors">Smart Grade Assistant</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-extrabold text-sm mb-4 uppercase tracking-wider">To'lov va Xavfsizlik</h4>
            <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-300">
              <span className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700">CLICK</span>
              <span className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700">PAYME</span>
              <span className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700">UZCARD</span>
              <span className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700">HUMO</span>
            </div>
            <p className="text-xs text-slate-500 mt-4 font-medium">
              Barcha to'lovlar 256-bit SSL shifrlangan va xavfsiz amalga oshiriladi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
