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
  Clock
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
  imageText: string;
  inStock: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// Mock Data
const PRODUCTS: Product[] = [
  { id: 1, title: "Ortopedik Maktab Ryukzagi 'Pro-Ergo 2026'", price: 245000, oldPrice: 310000, category: "Maktab Sumkalari", grade: [1, 2, 3, 4], rating: 4.9, reviews: 128, badge: "-21%", badgeColor: "bg-emerald-500", imageText: "🎒 Pro Ryukzak", inStock: true },
  { id: 2, title: "Premium 12-Varaqli Daftarlar To'plami (10 ta)", price: 18000, oldPrice: 24000, category: "Daftarlar", grade: [1, 2, 3, 4, 5, 6, 7], rating: 4.8, reviews: 340, badge: "Xit Sotuv", badgeColor: "bg-blue-600", imageText: "📓 10x Daftar", inStock: true },
  { id: 3, title: "Maped ColorPeps 24-Rangli Qalamlar To'plami", price: 45000, oldPrice: 58000, category: "Qalamlar", grade: [1, 2, 3, 4, 5, 6, 7], rating: 5.0, reviews: 89, badge: "Yangi", badgeColor: "bg-purple-600", imageText: "✏️ 24x Qalam", inStock: true },
  { id: 4, title: "Metall Tsirkul va Geometriya Pro To'plami", price: 35000, oldPrice: 45000, category: "Geometriya", grade: [5, 6, 7], rating: 4.7, reviews: 64, badge: "-22%", badgeColor: "bg-emerald-500", imageText: "📐 Geometriya", inStock: true },
  { id: 5, title: "Ergonomik Sharli Ruchkalar 10 ta (Ko'k va Qora)", price: 22000, oldPrice: 28000, category: "Ruchkalar", grade: [1, 2, 3, 4, 5, 6, 7], rating: 4.9, reviews: 210, badge: "Top Sifat", badgeColor: "bg-blue-600", imageText: "🖊️ 10x Ruchka", inStock: true },
  { id: 6, title: "Maktab Formasi Oq Ko'ylak (100% Paxta)", price: 120000, oldPrice: 150000, category: "Forma", grade: [1, 2, 3, 4, 5, 6, 7], rating: 4.8, reviews: 95, badge: "-20%", badgeColor: "bg-emerald-500", imageText: "👔 Oq Ko'ylak", inStock: true },
  { id: 7, title: "Suv Uchun Thermo-Butilka (500ml, Zanglamas)", price: 65000, oldPrice: 85000, category: "Aksessuarlar", grade: [1, 2, 3, 4, 5, 6, 7], rating: 4.9, reviews: 156, badge: "Yangi", badgeColor: "bg-purple-600", imageText: "🍶 Termos", inStock: true },
  { id: 8, title: "San'at va Chizmachilik Albomi (40 varaq, qalin)", price: 15000, oldPrice: 20000, category: "Daftarlar", grade: [1, 2, 3, 4, 5, 6, 7], rating: 4.7, reviews: 78, badge: "Arzon", badgeColor: "bg-amber-500", imageText: "🎨 Albom", inStock: true },
  { id: 9, title: "Urban Pro USB Noutbuk Ryukzagi (Katta Sinf)", price: 290000, oldPrice: 380000, category: "Maktab Sumkalari", grade: [5, 6, 7], rating: 5.0, reviews: 112, badge: "-23%", badgeColor: "bg-emerald-500", imageText: "💼 Urban Bag", inStock: true },
  { id: 10, title: "Akril Bo'yoqlar 12-Rangli To'plami (Mo'yqalam bilan)", price: 38000, oldPrice: 48000, category: "Qalamlar", grade: [2, 3, 4, 5], rating: 4.8, reviews: 84, badge: "San'at", badgeColor: "bg-pink-600", imageText: "🖌️ Bo'yoqlar", inStock: true },
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

export default function MaktabStartApp() {
  // Navigation & Tabs state
  const [activeTab, setActiveTab] = useState<"home" | "catalog" | "checklist" | "calculator">("home");
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  
  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[1], quantity: 2 },
  ]);
  const [wishlist, setWishlist] = useState<number[]>([1, 3]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  // Catalog Filter State
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc">("popular");

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
  const [calcGrade, setCalcGrade] = useState<number>(5);

  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // Computed Cart Values
  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const deliveryCost = cartSubtotal > 300000 || cartSubtotal === 0 ? 0 : 25000;
  const cartFinalTotal = cartSubtotal - discountAmount + deliveryCost;

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

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered Products for Catalog
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCat = selectedCategory === "Barchasi" || p.category === selectedCategory;
    const matchesGrade = selectedGradeFilter === null || p.grade.includes(selectedGradeFilter);
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesGrade && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return b.rating - a.rating;
  });

  // Checklist computation
  const completedChecklist = checklist.filter((i) => i.checked).length;
  const checklistProgress = Math.round((completedChecklist / checklist.length) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-600 selection:text-white relative font-sans">
      
      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-fade-in">
          <span className="font-semibold text-sm">{toast}</span>
        </div>
      )}

      {/* INSTANT SEARCH MODAL (Ctrl + K) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-blue-600 shrink-0" />
              <input
                type="text"
                placeholder="Ruchka, daftar, ryukzak yoki 5-sinf deb qidiring..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full text-base text-slate-800 outline-none placeholder:text-slate-400 font-medium"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto p-4 space-y-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8 text-slate-400 font-medium">Hech narsa topilmadi...</div>
              ) : (
                filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      addToCart(p, 1);
                      setIsSearchOpen(false);
                    }}
                    className="p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
                        {p.imageText.split(" ")[0]}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">{p.title}</h4>
                        <span className="text-xs text-blue-600 font-medium">{p.category} • {p.price.toLocaleString()} so'm</span>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs hover:bg-blue-600 hover:text-white transition-colors">
                      + Savatga
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-medium">
              <span>Natijalar: {filteredProducts.length} ta</span>
              <span>Yopish uchun <kbd className="px-1.5 py-0.5 bg-white border rounded">ESC</kbd></span>
            </div>
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
                    <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-3xl shadow-sm shrink-0">
                      {item.product.imageText.split(" ")[0]}
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
                {/* Coupon Input */}
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

                {/* Totals */}
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
                  <input type="text" placeholder="Jasur Karimov" defaultValue="Ota-ona / O'quvchi" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold outline-none focus:border-blue-500" />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Telefon Raqam</label>
                <div className="relative">
                  <input type="text" placeholder="+998 (90) 123-45-67" defaultValue="+998 " className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-semibold outline-none focus:border-blue-500" />
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

      {/* STICKY GLASS NAVBAR */}
      <header className="sticky top-0 z-40 glass-nav transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div onClick={() => setActiveTab("home")} className="flex items-center gap-3 cursor-pointer group">
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

          {/* Nav Tabs (Desktop) */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60 font-semibold text-sm">
            {[
              { id: "home", label: "🏠 Asosiy & Grade Assistant" },
              { id: "catalog", label: "🛍️ Katalog & Filtr" },
              { id: "checklist", label: "📝 Checklist" },
              { id: "calculator", label: "🧮 Byudjet Kalkulyatori" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center transition-colors relative"
              title="Qidiruv (Ctrl+K)"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => showToast(`❤️ Sizda ${wishlist.length} ta sevimli mahsulot bor`)}
              className="relative w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center transition-colors"
            >
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center gap-2.5 shadow-lg shadow-blue-500/25 transition-all active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Savat</span>
              <span className="bg-white text-blue-600 font-extrabold text-xs px-2 py-0.5 rounded-full">
                {cartTotalItems}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Tabs */}
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-2 flex items-center justify-around overflow-x-auto text-xs font-bold text-slate-700 gap-2">
          <button onClick={() => setActiveTab("home")} className={`px-3 py-1.5 rounded-lg ${activeTab === "home" ? "bg-blue-600 text-white" : "bg-slate-100"}`}>🏠 Asosiy</button>
          <button onClick={() => setActiveTab("catalog")} className={`px-3 py-1.5 rounded-lg ${activeTab === "catalog" ? "bg-blue-600 text-white" : "bg-slate-100"}`}>🛍️ Katalog</button>
          <button onClick={() => setActiveTab("checklist")} className={`px-3 py-1.5 rounded-lg ${activeTab === "checklist" ? "bg-blue-600 text-white" : "bg-slate-100"}`}>📝 Checklist</button>
          <button onClick={() => setActiveTab("calculator")} className={`px-3 py-1.5 rounded-lg ${activeTab === "calculator" ? "bg-blue-600 text-white" : "bg-slate-100"}`}>🧮 Kalkulyator</button>
        </div>
      </header>

      {/* MAIN VIEW CONTENTS */}
      <main className="flex-1">
        
        {/* ========================================================================= */}
        {/* TAB 1: HOME & GRADE ASSISTANT */}
        {/* ========================================================================= */}
        {activeTab === "home" && (
          <div className="animate-fade-in">
            {/* HERO SECTION */}
            <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-white via-slate-50 to-white">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-mesh-1 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-mesh-2 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-bold mb-6 shadow-sm">
                  <Sparkles className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: "3s" }} />
                  <span>O'zbekistonda #1 Smart Maktab Bozori • 2026 Yangi Mavsum</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15]">
                  Sinfingizni tanlang va maktabga{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">
                    5 daqiqada
                  </span>{" "}
                  tayyor bo'ling!
                </h1>

                <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
                  1–7 sinf o'quvchilari uchun o'qituvchilar tasdiqlagan tayyor qurollar to'plami. Vaqtingizni bozorlarda o'tkazmang — bitta klik bilan uydan buyurtma bering!
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      const el = document.getElementById("grade-assistant-section");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-base shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span>Sinf bo'yicha yig'ish</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab("catalog")}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-200 shadow-sm flex items-center justify-center gap-2 transition-all hover:border-slate-300 cursor-pointer"
                  >
                    <span>🛍️ Katalogga o'tish</span>
                  </button>
                </div>

                {/* Benefits 4-Card Grid */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                  {[
                    { icon: Truck, title: "1 Kunda Yetkazish", desc: "Toshkent va viloyatlarga tezkor kuryer", color: "text-blue-600 bg-blue-50" },
                    { icon: ShieldCheck, title: "100% Sifat Kafolati", desc: "Faqat tekshirilgan brend mahsulotlar", color: "text-emerald-600 bg-emerald-50" },
                    { icon: Sparkles, title: "50%-gacha Tejamkorlik", desc: "To'plam olganda maxsus chegirma", color: "text-purple-600 bg-purple-50" },
                    { icon: Package, title: "Qulay To'lov", desc: "Qabul qilganda naqd yoki Payme/Click", color: "text-amber-600 bg-amber-50" },
                  ].map((item, idx) => (
                    <div key={idx} className="glass-card rounded-2xl p-5 text-left flex flex-col justify-between">
                      <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-3 shadow-sm`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                        <p className="text-xs text-slate-500 font-medium mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* GRADE ASSISTANT SECTION */}
            <section id="grade-assistant-section" className="py-16 md:py-24 bg-white border-y border-slate-200/80">
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

                {/* Grade Selector Pills */}
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

                {/* Recommended Package Card */}
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

                      {/* Items Checklist */}
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

                    {/* Right Price & CTA */}
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
            <section className="py-16 bg-slate-50">
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
                  <button onClick={() => setActiveTab("catalog")} className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer">
                    Barchasini ko'rish <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { name: "Maktab Sumkalari", count: 124, icon: Package, color: "bg-blue-50 text-blue-600" },
                    { name: "Daftarlar", count: 310, icon: BookOpen, color: "bg-emerald-50 text-emerald-600" },
                    { name: "Qalamlar", count: 450, icon: PenTool, color: "bg-purple-50 text-purple-600" },
                    { name: "Geometriya", count: 85, icon: Compass, color: "bg-amber-50 text-amber-600" },
                    { name: "Maktab Formasi", count: 190, icon: GraduationCap, color: "bg-rose-50 text-rose-600" },
                    { name: "Aksessuarlar", count: 220, icon: Sparkles, color: "bg-cyan-50 text-cyan-600" },
                  ].map((cat, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setActiveTab("catalog");
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

            {/* BEST SELLERS GRID */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    🔥 Hafta Xitlari & Eng Ko'p Sotilganlar
                  </h2>
                  <p className="text-slate-600 text-sm mt-1 font-medium">
                    Ota-onalar va o'quvchilar eng ko'p tanlayotgan sifatli mahsulotlar
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PRODUCTS.slice(0, 4).map((prod) => (
                    <div key={prod.id} className="group bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col justify-between relative">
                      <div className="relative aspect-square w-full rounded-xl bg-slate-50 flex items-center justify-center text-3xl font-bold text-slate-500 overflow-hidden mb-4 border border-slate-100">
                        <span className="group-hover:scale-110 transition-transform duration-500">{prod.imageText}</span>
                        {prod.badge && <span className={`absolute top-3 left-3 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-sm ${prod.badgeColor}`}>{prod.badge}</span>}
                        <button onClick={() => toggleWishlist(prod.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur text-slate-600 hover:text-rose-500 flex items-center justify-center shadow-sm transition-colors">
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
              </div>
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CATALOG & FILTERS */}
        {/* ========================================================================= */}
        {activeTab === "catalog" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Sidebar Filters */}
              <div className="w-full md:w-64 space-y-6 shrink-0 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm h-fit">
                <div className="flex items-center justify-between border-b pb-4">
                  <span className="font-extrabold text-base text-slate-900 flex items-center gap-2"><Filter className="w-4 h-4 text-blue-600" /> Filtrlar</span>
                  <button onClick={() => { setSelectedCategory("Barchasi"); setSelectedGradeFilter(null); setSearchQuery(""); }} className="text-xs font-bold text-rose-500 hover:underline cursor-pointer">Tozalash</button>
                </div>

                {/* Categories */}
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

                {/* Grade filter */}
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

              {/* Right Product Grid */}
              <div className="flex-1 space-y-6">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="font-bold text-sm text-slate-700">Topildi: <strong className="text-blue-600">{filteredProducts.length}</strong> ta mahsulot</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Saralash:</span>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((prod) => (
                    <div key={prod.id} className="group bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col justify-between relative">
                      <div className="relative aspect-square w-full rounded-xl bg-slate-50 flex items-center justify-center text-3xl font-bold text-slate-500 overflow-hidden mb-4 border border-slate-100">
                        <span className="group-hover:scale-110 transition-transform duration-500">{prod.imageText}</span>
                        {prod.badge && <span className={`absolute top-3 left-3 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-sm ${prod.badgeColor}`}>{prod.badge}</span>}
                        <button onClick={() => toggleWishlist(prod.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur text-slate-600 hover:text-rose-500 flex items-center justify-center shadow-sm transition-colors">
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
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SCHOOL CHECKLIST */}
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

            {/* Checklist Items */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
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
        {/* TAB 4: BUDGET CALCULATOR */}
        {/* ========================================================================= */}
        {activeTab === "calculator" && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-8">
              <div className="text-center max-w-xl mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/25">
                  <Calculator className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">🧮 Smart Byudjet Kalkulyatori</h2>
                <p className="text-slate-600 text-sm mt-2 font-medium">Rejalashtirgan byudjetingizni kiritish orqali eng optimal maktab to'plamini avtomatik hisoblab oling!</p>
              </div>

              {/* Slider Input */}
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

              {/* Recommendation result based on budget */}
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
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto font-sans">
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
              <li><button onClick={() => { setSelectedCategory("Maktab Sumkalari"); setActiveTab("catalog"); }} className="hover:text-white transition-colors cursor-pointer">Maktab Ryukzaklari</button></li>
              <li><button onClick={() => { setSelectedCategory("Daftarlar"); setActiveTab("catalog"); }} className="hover:text-white transition-colors cursor-pointer">Daftarlar va Albomlar</button></li>
              <li><button onClick={() => { setSelectedCategory("Qalamlar"); setActiveTab("catalog"); }} className="hover:text-white transition-colors cursor-pointer">Qalamlar va Ruchkalar</button></li>
              <li><button onClick={() => { setSelectedCategory("Geometriya"); setActiveTab("catalog"); }} className="hover:text-white transition-colors cursor-pointer">Geometriya qurollari</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-extrabold text-sm mb-4 uppercase tracking-wider">Mijozlarga yordam</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><button onClick={() => setActiveTab("checklist")} className="hover:text-white transition-colors cursor-pointer">Interaktiv Maktab Checklist</button></li>
              <li><button onClick={() => setActiveTab("calculator")} className="hover:text-white transition-colors cursor-pointer">Byudjet Kalkulyatori</button></li>
              <li><a href="#grade-assistant-section" className="hover:text-white transition-colors">Smart Grade Assistant</a></li>
              <li><span className="text-emerald-400 font-bold">Yetkazib berish: 24 soatda</span></li>
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
