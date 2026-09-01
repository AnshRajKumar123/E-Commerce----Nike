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

// 20 Full Nike Products with High-Res Reliable Sneaker Transparent/Cutout URLs
export const allProductsData = [
    // --- MEN'S SHOES (8 items) ---
    {
        id: "nike-01",
        title: "Nike Air Max Pulse",
        category: "men",
        categoryLabel: "Men's Lifestyle & Running",
        price: 13995,
        rating: 4.9,
        badge: "Trending",
        description: "Inspired by the underground London music scene, the Air Max Pulse combines tough textile framing with point-loaded Air cushioning for an ultra-responsive all-day ride.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80"
        ],
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
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80"
        ],
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
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80"
        ],
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
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
        ],
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
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80"
        ],
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
        image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
        ],
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
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80"
        ],
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
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
        ],
        sizes: [7, 8, 9, 10, 11, 12]
    },

    // --- WOMEN'S SHOES (6 items) ---
    {
        id: "nike-09",
        title: "Nike Air Max 90 Futura",
        category: "women",
        categoryLabel: "Women's Lifestyle",
        price: 13995,
        rating: 4.9,
        badge: "Trending",
        description: "Rethought through the lens of futurism, raw-edged overlays and floating Swoosh marks revamp this legendary Air icon.",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
        ],
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
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80"
        ],
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
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
        ],
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
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"
        ],
        sizes: [6, 6.5, 7, 8, 8.5]
    },

    // --- KIDS' SHOES (3 items) ---
    {
        id: "nike-13",
        title: "Nike Dunk Low Kids",
        category: "kids",
        categoryLabel: "Older Kids' Footwear",
        price: 6995,
        rating: 4.9,
        badge: "Heritage",
        description: "Built tough with real and synthetic leather to withstand outdoor playground sessions and schoolyard sports.",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80"
        ],
        sizes: [3.5, 4, 4.5, 5, 5.5, 6]
    },
    {
        id: "nike-14",
        title: "Nike Air Max 270 GO",
        category: "kids",
        categoryLabel: "Kids' Easy Slip-On",
        price: 8995,
        rating: 4.7,
        badge: "Easy Entry",
        description: "Features a collapsible heel mechanism that allows kids to step down and pop right in without tying laces.",
        image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
        ],
        sizes: [2, 3, 4, 5]
    },
    {
        id: "nike-15",
        title: "Nike Flex Runner 3 Kids",
        category: "kids",
        categoryLabel: "Kids' Slip-On Runner",
        price: 3495,
        rating: 4.6,
        badge: "Flexible",
        description: "Stretchy bootie design makes it simple to slip on, while durable leather sides give supportive structure.",
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80"
        ],
        sizes: [1, 2, 3, 4, 5]
    },

    // --- SALE (3 items) ---
    {
        id: "nike-16",
        title: "Nike Air Winflo 10",
        category: "sale",
        categoryLabel: "Men's Road Running",
        price: 6795,
        originalPrice: 8695,
        rating: 4.7,
        badge: "25% OFF",
        description: "A balanced ride to kickstart your run, with supportive engineered mesh and responsive Nike Air cushioning.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80"
        ],
        sizes: [7, 8, 9, 10, 11]
    },
    {
        id: "nike-17",
        title: "Nike Blazer Mid '77 Vintage",
        category: "sale",
        categoryLabel: "Unisex Vintage Hoops",
        price: 6995,
        originalPrice: 9295,
        rating: 4.8,
        badge: "30% OFF",
        description: "Styled for the '70s, loved in the '80s, classic in the '90s. Exposed foam tongue and textured leather.",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80"
        ],
        sizes: [6, 7, 8, 9, 10, 11]
    },

    // --- SNKRS (3 items) ---
    {
        id: "nike-18",
        title: "Travis Scott x Air Jordan 1 Low",
        category: "snkrs",
        categoryLabel: "SNKRS Special Release",
        price: 18995,
        rating: 5.0,
        badge: "Draw Live",
        description: "Cactus Jack reverse Swoosh branding paired with olive suede overlays and custom heel embroidery.",
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80"
        ],
        sizes: [8, 9, 10, 11]
    },
    {
        id: "nike-19",
        title: "Nike SB Dunk Low Pro 'Chicago'",
        category: "snkrs",
        categoryLabel: "Skateboarding Special",
        price: 11995,
        rating: 5.0,
        badge: "Limited Drop",
        description: "Classic Varsity Red and White colorway reimagined with padded tongue and Zoom Air insole for skate impact.",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80"
        ],
        sizes: [7, 8, 9, 10]
    },
    {
        id: "nike-20",
        title: "Air Jordan 4 Retro 'Military Blue'",
        category: "snkrs",
        categoryLabel: "OG Remastered",
        price: 19295,
        rating: 4.9,
        badge: "Shock Drop",
        description: "The 1989 icon returns in true original form with Nike Air branding on the heel tab and mesh side netting.",
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80"
        ],
        sizes: [8, 8.5, 9, 9.5, 10, 11, 12]
    }
];

export const heroSneakersData = allProductsData.slice(0, 3);
export const topSilhouettesData = allProductsData.slice(0, 4);

export const spotlightData = {
    tagline: "IN THE SPOTLIGHT",
    headline: "AIR ZOOM ALPHAFLY NEXT% 3",
    description: "Fine-tuned for marathon speed, pushing the limits of what was thought possible with dual Air Zoom pods and carbon Flyplate energy return.",
    ctaText: "Shop the Innovation",
    heroImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
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