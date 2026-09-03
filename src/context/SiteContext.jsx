import { createContext, useContext, useEffect, useMemo, useState } from "react";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15546.690418581948!2d77.49124741782535!3d13.05649951174159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae2325f9891673%3A0xc675702a108ad7c9!2sVrushabh%20Kalashaala!5e0!3m2!1sen!2sin!4v1787754227831!5m2!1sen!2sin";

export const DEFAULT_CONTENT = {
  schoolName: "Vrushabh Kalashaala",
  tagline: "Strong body. Calm mind. Brave heart.",
  heroTitle: "Learn karate.\nGrow strong.\nStay humble.",
  heroSub:
    "A small dojo with a big heart. We teach karate the old way — with respect, patience and daily practice. Everyone is welcome.",
  since: "Since 2011",
  phone: "08123091396",
  email: "vrushabhkalashaala@gmail.com",
  address: "Vrushabh Kalashaala, See map below — Bengaluru, Karnataka",
  bookingFee: 250,
  upiId: "vrushabhkalashaala@upi",
  mapEmbed: MAP_EMBED_SRC,
  masterName: "Sensei Rajesh Kumar",
  masterRank: "Black Belt — 4th Dan",
  masterBio:
    "Our teacher has trained for more than 25 years. He learned from his own master in Bengaluru and has taught hundreds of students — from 5-year-old kids to working adults. He believes every student can grow, one small step at a time.",
  masterPhoto: null, // data URL
  logo: null, // data URL
  achievements: [
    { year: "2023", text: "Best Dojo Award — State Karate Championship (demo)" },
    { year: "2019", text: "Trained 3 national-level gold medalists (demo)" },
    { year: "2016", text: "Referee & Judge — District Karate Association (demo)" },
    { year: "2011", text: "Opened Vrushabh Kalashaala with 9 students" },
  ],
  certificates: [
    { title: "Black Belt Certificate — 4th Dan", org: "Karate Association of India (demo)" },
    { title: "National Level Instructor License", org: "World Karate Federation (demo)" },
    { title: "First Aid & Sports Safety", org: "Sports Authority of India (demo)" },
  ],
  timings: [
    { days: "Mon · Wed · Fri", kids: "5:00 PM – 6:15 PM", adults: "6:30 PM – 7:45 PM" },
    { days: "Tue · Thu", kids: "5:00 PM – 6:15 PM", adults: "6:30 PM – 7:45 PM" },
    { days: "Saturday", kids: "9:00 AM – 10:15 AM", adults: "10:30 AM – 12:00 PM" },
    { days: "Sunday", kids: "Holiday", adults: "Holiday" },
  ],
  slots: ["Mon–Wed–Fri · Kids 5:00 PM", "Mon–Wed–Fri · Adults 6:30 PM", "Tue–Thu · Kids 5:00 PM", "Tue–Thu · Adults 6:30 PM", "Saturday · Kids 9:00 AM", "Saturday · Adults 10:30 AM"],
  programs: [
    { name: "Little Tigers", ages: "Age 5 – 9", desc: "Fun first steps. Games, balance, focus and respect.", icon: "🥋" },
    { name: "Juniors", ages: "Age 10 – 15", desc: "Real technique. Discipline, confidence and self-defence.", icon: "👊" },
    { name: "Adults", ages: "Age 16+", desc: "Get fit, stay calm, learn to protect yourself.", icon: "🔥" },
  ],
  stats: { students: 350, years: 15, medals: 120 },
  socials: {
    instagram: "https://www.instagram.com/vrushabhkalashaala",
    youtube: "https://www.youtube.com/@vrushabhkalashaala",
  },
  gallery: [], // [{ src, caption }]
  qrImage: null, // admin-uploaded QR overrides the generated one
  feesNote: "Monthly fee is ₹800. First booking to reserve your seat is ₹250 (one time, adjusted in first month).",
};

const DEFAULT_ADMIN_CREDS = { username: "admin", password: "123456789" };

const SiteContext = createContext(null);

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// shrink uploaded images so localStorage stays small
export function fileToCompressedDataURL(file, maxDim = 1400, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function SiteProvider({ children }) {
  const [content, setContent] = useState(() => load("vk_content", DEFAULT_CONTENT));
  const [bookings, setBookings] = useState(() => load("vk_bookings", []));
  const [adminCreds, setAdminCreds] = useState(() => load("vk_admin_creds", DEFAULT_ADMIN_CREDS));
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem("vk_admin") === "1");

  useEffect(() => {
    try {
      localStorage.setItem("vk_content", JSON.stringify(content));
    } catch {
      alert("Storage is full. Please remove some gallery photos in the admin panel.");
    }
  }, [content]);

  useEffect(() => {
    localStorage.setItem("vk_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("vk_admin_creds", JSON.stringify(adminCreds));
  }, [adminCreds]);

  const value = useMemo(() => {
    const update = (patch) => setContent((c) => ({ ...c, ...patch }));
    const addBooking = (b) => {
      const booking = {
        ...b,
        id: "VK-" + Date.now().toString(36).toUpperCase().slice(-6),
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      setBookings((list) => [booking, ...list]);
      return booking;
    };
    const setBookingStatus = (id, status) =>
      setBookings((list) => list.map((b) => (b.id === id ? { ...b, status } : b)));
    const deleteBooking = (id) => setBookings((list) => list.filter((b) => b.id !== id));
    const login = (u, p) => {
      if (u === adminCreds.username && p === adminCreds.password) {
        sessionStorage.setItem("vk_admin", "1");
        setIsAdmin(true);
        return true;
      }
      return false;
    };
    const logout = () => {
      sessionStorage.removeItem("vk_admin");
      setIsAdmin(false);
    };
    const resetAll = () => {
      setContent(DEFAULT_CONTENT);
      setBookings([]);
    };
    return {
      content, update, setContent,
      bookings, addBooking, setBookingStatus, deleteBooking,
      isAdmin, login, logout, adminCreds, setAdminCreds, resetAll,
      defaultContent: DEFAULT_CONTENT,
    };
  }, [content, bookings, adminCreds, isAdmin]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}
