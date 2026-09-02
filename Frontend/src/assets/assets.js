// ==========================================
// 👟 LOCAL SNEAKER IMAGES (Shoes_1 to Shoes_25)
// ==========================================
import Shoes_1 from "./images/Shoes_1.png";
import Shoes_2 from "./images/Shoes_2.png";
import Shoes_3 from "./images/Shoes_3.png";
import Shoes_4 from "./images/Shoes_4.png";
import Shoes_5 from "./images/Shoes_5.png";
import Shoes_6 from "./images/Shoes_6.png";
import Shoes_7 from "./images/Shoes_7.png";
import Shoes_8 from "./images/Shoes_8.png";
import Shoes_9 from "./images/Shoes_9.png";
import Shoes_10 from "./images/Shoes_10.png";
import Shoes_11 from "./images/Shoes_11.png";
import Shoes_12 from "./images/Shoes_12.png";
import Shoes_13 from "./images/Shoes_13.png";
import Shoes_14 from "./images/Shoes_14.png";
import Shoes_15 from "./images/Shoes_15.png";
import Shoes_16 from "./images/Shoes_16.png";
import Shoes_17 from "./images/Shoes_17.png";
import Shoes_18 from "./images/Shoes_18.png";
import Shoes_19 from "./images/Shoes_19.png";
import Shoes_20 from "./images/Shoes_20.png";
import Shoes_21 from "./images/Shoes_21.png";
import Shoes_22 from "./images/Shoes_22.png";
import Shoes_23 from "./images/Shoes_23.png";
import Shoes_24 from "./images/Shoes_24.png";
import Shoes_25 from "./images/Shoes_25.png";

import WebLogo from "./WebImg/WebsiteLogo.png"

export const nikeGeneral = {
    WebLogo
}

// ==========================================
// 🧭 NAVIGATION DATA
// ==========================================
export const nikeNavData = {
  navLinks: [
    { label: "New & Featured", path: "/new" },
    { label: "Men", path: "/men" },
    { label: "Women", path: "/women" },
    { label: "Kids", path: "/kids" },
    { label: "Sale", path: "/sale", isSale: true },
    { label: "SNKRS", path: "/snkrs", isSnkrs: true },
  ],
  utilityLinks: [
    { label: "Find a Store", path: "/stores" },
    { label: "Help", path: "/help" },
    { label: "Join Us", path: "/join" },
    { label: "Sign In", path: "/login" },
  ]
};

// ==========================================
// 📦 ALL 25 SNEAKER PRODUCTS
// ==========================================
export const allProductsData = [
  // --- MEN'S SHOES ---
  {
    id: "nike-01",
    title: "Nike Air Max Pulse",
    category: "men",
    categoryLabel: "Men's Lifestyle & Running",
    price: 13995,
    rating: 4.9,
    badge: "Trending",
    description: "Inspired by the underground London music scene, the Air Max Pulse combines tough textile framing with point-loaded Air cushioning for an ultra-responsive all-day ride.",
    image: Shoes_1,
    images: [Shoes_1, Shoes_2, Shoes_3, Shoes_4],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 11]
  },
  {
    id: "nike-02",
    title: "Air Jordan 1 High OG",
    category: "men",
    categoryLabel: "Men's Basketball Heritage",
    price: 16995,
    rating: 5.0,
    badge: "Bestseller",
    description: "Familiar shape, fresh palette. Full-grain leather upper with encapsulated Nike Air-Sole unit in the heel delivers timeless hoop energy.",
    image: Shoes_2,
    images: [Shoes_2, Shoes_10, Shoes_16, Shoes_1],
    sizes: [8, 8.5, 9, 10, 10.5, 11]
  },
  {
    id: "nike-03",
    title: "Nike Dunk Low Retro",
    category: "men",
    categoryLabel: "Men's Skate & Street",
    price: 9695,
    rating: 4.8,
    badge: "Popular",
    description: "Created for the hardwood but taken to the streets, the '80s icon returns with crisp overlays and heritage color blocking.",
    image: Shoes_3,
    images: [Shoes_3, Shoes_9, Shoes_18, Shoes_19],
    sizes: [6, 7, 8, 9, 10]
  },
  {
    id: "nike-04",
    title: "Nike Air Force 1 '07",
    category: "men",
    categoryLabel: "Men's Classic",
    price: 8195,
    rating: 4.9,
    badge: "Essential",
    description: "The radiance lives on. Crossing hardwood comfort with off-court flair, this silhouette features stitched overlays and classic cupsole construction.",
    image: Shoes_4,
    images: [Shoes_4, Shoes_5, Shoes_17, Shoes_1],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 11, 12]
  },
  {
    id: "nike-05",
    title: "Nike Zoom Vomero 5",
    category: "men",
    categoryLabel: "Men's Tech Runner",
    price: 14995,
    rating: 4.8,
    badge: "Hot Drop",
    description: "Carve a new lane with complex layering of textiles, synthetic suede, and plastic accents for one of the season's sharpest retro runners.",
    image: Shoes_5,
    images: [Shoes_5, Shoes_12, Shoes_22, Shoes_2],
    sizes: [7.5, 8, 9, 9.5, 10, 11]
  },
  {
    id: "nike-06",
    title: "Nike Air Max 270",
    category: "men",
    categoryLabel: "Men's Lifestyle Air",
    price: 13495,
    rating: 4.8,
    badge: "Air Max Day",
    description: "Nike's first lifestyle Air Max brings you style, comfort and big attitude with an extra-large Air window.",
    image: Shoes_6,
    images: [Shoes_6, Shoes_14, Shoes_13, Shoes_1],
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: "nike-07",
    title: "Nike Metcon 9",
    category: "men",
    categoryLabel: "Cross-Training & Gym",
    price: 12795,
    rating: 4.9,
    badge: "Pro Athlete",
    description: "Larger Hyperlift plate and added rubber rope wrap for stability during weightlifting and high-intensity agility drills.",
    image: Shoes_7,
    images: [Shoes_7, Shoes_8, Shoes_18, Shoes_3],
    sizes: [8, 8.5, 9, 10, 11]
  },
  {
    id: "nike-08",
    title: "Nike Invincible 3",
    category: "men",
    categoryLabel: "Road Running Maximum Cushion",
    price: 16995,
    rating: 4.9,
    badge: "Super Bouncy",
    description: "Feel the highest level of comfort with thick ZoomX foam cushioning engineered to protect against fatigue on long road runs.",
    image: Shoes_8,
    images: [Shoes_8, Shoes_24, Shoes_11, Shoes_2],
    sizes: [7, 8, 9, 10, 11, 12]
  },

  // --- WOMEN'S SHOES ---
  {
    id: "nike-09",
    title: "Nike Air Max 90 Futura",
    category: "women",
    categoryLabel: "Women's Lifestyle",
    price: 13995,
    rating: 4.9,
    badge: "Trending",
    description: "Rethought through the lens of futurism, raw-edged overlays and floating Swoosh marks revamp this legendary Air icon.",
    image: Shoes_9,
    images: [Shoes_9, Shoes_17, Shoes_3, Shoes_4],
    sizes: [5, 5.5, 6, 6.5, 7, 8]
  },
  {
    id: "nike-10",
    title: "Nike Free Metcon 5",
    category: "women",
    categoryLabel: "Women's Workout & Training",
    price: 10795,
    rating: 4.8,
    badge: "Top Rated",
    description: "Flexibility at the forefoot combined with stability in the back to anchor deep gym squats and HIIT intervals.",
    image: Shoes_10,
    images: [Shoes_10, Shoes_16, Shoes_2, Shoes_25],
    sizes: [6, 6.5, 7, 7.5, 8]
  },
  {
    id: "nike-11",
    title: "Nike Calm Mule",
    category: "women",
    categoryLabel: "Women's Slip-On Slide",
    price: 5695,
    rating: 4.7,
    badge: "New Arrival",
    description: "Soft foam comfort with water-friendly contoured footbeds and removable heel strap for versatile styling.",
    image: Shoes_11,
    images: [Shoes_11, Shoes_21, Shoes_22, Shoes_7],
    sizes: [5, 6, 7, 8, 9]
  },
  {
    id: "nike-12",
    title: "Nike Pegasus 41 Women",
    category: "women",
    categoryLabel: "Women's Daily Road Runner",
    price: 11895,
    rating: 4.8,
    badge: "Responsive",
    description: "Dual Air Zoom pods and ReactX foam midsole provide balanced energy return on daily mileage.",
    image: Shoes_12,
    images: [Shoes_12, Shoes_25, Shoes_5, Shoes_9],
    sizes: [6, 6.5, 7, 8, 8.5]
  },
  {
    id: "nike-13",
    title: "Nike Air Max Bella TR 5",
    category: "women",
    categoryLabel: "Women's Training & Gym",
    price: 6495,
    rating: 4.7,
    badge: "Lightweight",
    description: "Combines the bounce and beauty of Max Air cushioning with a flat sole that lends a stabilizing advantage while you tone and sculpt.",
    image: Shoes_13,
    images: [Shoes_13, Shoes_6, Shoes_14, Shoes_1],
    sizes: [5, 6, 6.5, 7, 8]
  },

  // --- KIDS' SHOES ---
  {
    id: "nike-14",
    title: "Nike Dunk Low Kids",
    category: "kids",
    categoryLabel: "Older Kids' Footwear",
    price: 6995,
    rating: 4.9,
    badge: "Heritage",
    description: "Built tough with real and synthetic leather to withstand outdoor playground sessions and schoolyard sports.",
    image: Shoes_14,
    images: [Shoes_14, Shoes_15, Shoes_6, Shoes_13],
    sizes: [3.5, 4, 4.5, 5, 5.5, 6]
  },
  {
    id: "nike-15",
    title: "Nike Air Max 270 GO",
    category: "kids",
    categoryLabel: "Kids' Easy Slip-On",
    price: 8995,
    rating: 4.7,
    badge: "Easy Entry",
    description: "Features a collapsible heel mechanism that allows kids to step down and pop right in without tying laces.",
    image: Shoes_15,
    images: [Shoes_15, Shoes_14, Shoes_6, Shoes_23],
    sizes: [2, 3, 4, 5]
  },
  {
    id: "nike-16",
    title: "Nike Flex Runner 3 Kids",
    category: "kids",
    categoryLabel: "Kids' Slip-On Runner",
    price: 3495,
    rating: 4.6,
    badge: "Flexible",
    description: "Stretchy bootie design makes it simple to slip on, while durable leather sides give supportive structure.",
    image: Shoes_16,
    images: [Shoes_16, Shoes_10, Shoes_2, Shoes_25],
    sizes: [1, 2, 3, 4, 5]
  },
  {
    id: "nike-17",
    title: "Nike Court Borough Low 2",
    category: "kids",
    categoryLabel: "Younger Kids' Classic",
    price: 3995,
    rating: 4.8,
    badge: "All-Day Play",
    description: "Structured, supportive fit with a retro basketball design so kids can look like an all-star on and off the court.",
    image: Shoes_17,
    images: [Shoes_17, Shoes_9, Shoes_4, Shoes_25],
    sizes: [1, 2, 3, 4]
  },

  // --- SALE ITEMS ---
  {
    id: "nike-18",
    title: "Nike Air Winflo 10",
    category: "sale",
    categoryLabel: "Men's Road Running",
    price: 6795,
    originalPrice: 8695,
    rating: 4.7,
    badge: "25% OFF",
    description: "A balanced ride to kickstart your run, with supportive engineered mesh and responsive Nike Air cushioning.",
    image: Shoes_18,
    images: [Shoes_18, Shoes_7, Shoes_8, Shoes_24],
    sizes: [7, 8, 9, 10, 11]
  },
  {
    id: "nike-19",
    title: "Nike Blazer Mid '77 Vintage",
    category: "sale",
    categoryLabel: "Unisex Vintage Hoops",
    price: 6995,
    originalPrice: 9295,
    rating: 4.8,
    badge: "30% OFF",
    description: "Styled for the '70s, loved in the '80s, classic in the '90s. Exposed foam tongue and textured leather.",
    image: Shoes_19,
    images: [Shoes_19, Shoes_3, Shoes_9, Shoes_20],
    sizes: [6, 7, 8, 9, 10, 11]
  },
  {
    id: "nike-20",
    title: "Nike Giannis Immortality 3",
    category: "sale",
    categoryLabel: "Basketball Shoes",
    price: 5495,
    originalPrice: 7295,
    rating: 4.6,
    badge: "20% OFF",
    description: "Engineered for high-paced court transitions, with ultra-responsive dual-density foam and multidirectional traction grooves.",
    image: Shoes_20,
    images: [Shoes_20, Shoes_19, Shoes_21, Shoes_22],
    sizes: [7, 8, 8.5, 9, 10]
  },

  // --- SNKRS EXCLUSIVES ---
  {
    id: "nike-21",
    title: "Travis Scott x Air Jordan 1 Low",
    category: "snkrs",
    categoryLabel: "SNKRS Special Release",
    price: 18995,
    rating: 5.0,
    badge: "Draw Live",
    description: "Cactus Jack reverse Swoosh branding paired with olive suede overlays and custom heel embroidery.",
    image: Shoes_21,
    images: [Shoes_21, Shoes_22, Shoes_20, Shoes_11],
    sizes: [8, 9, 10, 11]
  },
  {
    id: "nike-22",
    title: "Nike SB Dunk Low Pro 'Chicago'",
    category: "snkrs",
    categoryLabel: "Skateboarding Special",
    price: 11995,
    rating: 5.0,
    badge: "Limited Drop",
    description: "Classic Varsity Red and White colorway reimagined with padded tongue and Zoom Air insole for skate impact.",
    image: Shoes_22,
    images: [Shoes_22, Shoes_21, Shoes_11, Shoes_5],
    sizes: [7, 8, 9, 10]
  },
  {
    id: "nike-23",
    title: "Air Jordan 4 Retro 'Military Blue'",
    category: "snkrs",
    categoryLabel: "OG Remastered",
    price: 19295,
    rating: 4.9,
    badge: "Shock Drop",
    description: "The 1989 icon returns in true original form with Nike Air branding on the heel tab and mesh side netting.",
    image: Shoes_23,
    images: [Shoes_23, Shoes_15, Shoes_14, Shoes_6],
    sizes: [8, 8.5, 9, 9.5, 10, 11, 12]
  },
  {
    id: "nike-24",
    title: "Kobe 8 Protro 'Court Purple'",
    category: "snkrs",
    categoryLabel: "Mamba Mentality",
    price: 16995,
    rating: 5.0,
    badge: "Exclusive",
    description: "Engineered mesh upper patterned with Kobe's iconic numbers 8 and 24, backed by React foam drop-in midsole.",
    image: Shoes_24,
    images: [Shoes_24, Shoes_8, Shoes_18, Shoes_7],
    sizes: [8, 9, 10, 11]
  },
  {
    id: "nike-25",
    title: "Nike Air VaporMax Plus",
    category: "snkrs",
    categoryLabel: "Futuristic VaporMax",
    price: 18295,
    rating: 4.9,
    badge: "Pure Air",
    description: "A nod to the 1998 Air Max Plus with floating cage architecture, cushioned upper, and revolutionary VaporMax Air technology.",
    image: Shoes_25,
    images: [Shoes_25, Shoes_12, Shoes_10, Shoes_17],
    sizes: [7.5, 8, 9, 10, 11]
  }
];

// ==========================================
// 🌟 SUBSETS FOR HERO & SPOTLIGHT
// ==========================================
export const heroSneakersData = allProductsData.slice(0, 3);
export const topSilhouettesData = allProductsData.slice(0, 4);

export const spotlightData = {
  tagline: "IN THE SPOTLIGHT",
  headline: "AIR ZOOM ALPHAFLY NEXT% 3",
  description: "Fine-tuned for marathon speed, pushing the limits of what was thought possible with dual Air Zoom pods and carbon Flyplate energy return.",
  ctaText: "Shop the Innovation",
  heroImage: Shoes_1,
  stats: [
    { label: "Energy Return", value: "85%" },
    { label: "Weight", value: "218g" },
    { label: "Marathon Wins", value: "14+" }
  ]
};

export const shoeTechFeatures = [
  {
    icon: "bx-wind",
    title: "Air Sole Capsule",
    desc: "Pressurized gas chambers compress on landing to absorb shock and instantly rebound."
  },
  {
    icon: "bx-layer",
    title: "Flyknit Upper Mesh",
    desc: "Featherweight yarn woven into single-piece seamless upper for custom adaptive support."
  },
  {
    icon: "bx-shield-quarter",
    title: "Carbon Fiber Flyplate",
    desc: "Full-length responsive plate engineered to propel stride mechanics forward."
  },
  {
    icon: "bx-recycle",
    title: "Move to Zero Recycled",
    desc: "Constructed with at least 20% recycled materials by total weight to reduce carbon waste."
  }
];

export const companyValues = [
  {
    tag: "INNOVATION",
    title: "Nike Sports Research Lab (NSRL)",
    desc: "Where human potential meets athletic science through 3D motion capture and environmental biomechanics.",
    link: "#"
  },
  {
    tag: "SUSTAINABILITY",
    title: "Move to Zero Journey",
    desc: "Zero carbon and zero waste initiative protecting the future of sport across our supply chain.",
    link: "#"
  },
  {
    tag: "COMMUNITY",
    title: "Made to Play",
    desc: "Engaging 17M+ kids worldwide in active play, coaching programs, and local community sport.",
    link: "#"
  }
];