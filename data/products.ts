export interface ProductSizeOption {
  id: string;
  name: string;
  price: number;
  inStock?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "Baby Clothing" | "Baby Sets" | "Swaddles & Essentials" | "Towels & Wipes" | "Accessories";
  description: string;
  features: string[];
  startingPrice: number;
  sizes: ProductSizeOption[];
  image: string;
  gallery?: string[];
  fabric: string;
  careInstructions: string;
  isFeatured?: boolean;
  isBestseller?: boolean;
}

export const CATEGORIES = [
  "All",
  "Baby Clothing",
  "Baby Sets",
  "Swaddles & Essentials",
  "Towels & Wipes",
  "Accessories",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const PRODUCTS: Product[] = [
  {
    id: "button-jabla",
    name: "Button Jabla",
    slug: "button-jabla",
    category: "Baby Clothing",
    description:
      "Crafted from 100% pure combed organic cotton muslin, this classic Button Jabla offers supreme breathability and softness. Designed with baby-safe front buttons for effortless changing, flat-felled soft seams to prevent chaffing, and an airy silhouette ideal for delicate infant skin.",
    features: [
      "100% Pure Organic Cotton Muslin",
      "Front-opening button placket for easy dressing",
      "Hypoallergenic, breathable double gauze weave",
      "Gets softer with every wash",
      "Pre-washed to minimize shrinkage",
    ],
    startingPrice: 43.5,
    sizes: [
      { id: "nb-0-3-3-6", name: "NB, 0–3, 3–6 months", price: 43.5, inStock: true },
      { id: "6-9-9-12", name: "6–9, 9–12 months", price: 48.0, inStock: true },
    ],
    image: "/products/button-jabla.jpg",
    fabric: "100% Combed Double Muslin (130 GSM)",
    careInstructions: "Machine wash gentle cycle at 30°C. Line dry in shade. Warm iron if needed.",
    isFeatured: true,
    isBestseller: true,
  },
  {
    id: "knotted-jabla",
    name: "Knotted Jabla",
    slug: "knotted-jabla",
    category: "Baby Clothing",
    description:
      "A timeless staple for newborns and infants. Features adjustable shoulder knot ties that allow gentle size tailoring as your baby grows. Pure open-weave muslin ensures optimal airflow in all seasons, keeping baby calm and comfortable.",
    features: [
      "Traditional Indian knotted shoulder ties",
      "Zero scratchy tags or metal closures",
      "Featherlight airy cotton gauze",
      "Gentle elastic-free hemline",
    ],
    startingPrice: 35.0,
    sizes: [
      { id: "nb-3-6", name: "NB–3–6 months", price: 35.0, inStock: true },
    ],
    image: "/products/knotted-jabla.jpg",
    fabric: "100% Pure Organic Cotton Muslin",
    careInstructions: "Gentle hand or machine wash. Do not bleach. Air dry naturally.",
    isFeatured: true,
    isBestseller: true,
  },
  {
    id: "nappy",
    name: "Nappy",
    slug: "nappy",
    category: "Swaddles & Essentials",
    description:
      "Traditional triangular muslin cotton baby nappy with soft tie strings. Chemical-free, highly absorbent, and ultra-gentle on newborn skin. The breathable open weave dries rapidly, helping prevent diaper rashes naturally.",
    features: [
      "Natural chemical-free infant cloth nappy",
      "Convenient adjustable tie strings",
      "Highly absorbent & quick-drying weave",
      "Prevents skin chafing and redness",
    ],
    startingPrice: 33.0,
    sizes: [
      { id: "nb", name: "NB", price: 33.0, inStock: true },
    ],
    image: "/products/nappy.jpg",
    fabric: "100% Double Layer Pure Cotton Muslin",
    careInstructions: "Machine wash warm with mild baby detergent. Sun dry for natural sanitation.",
    isFeatured: false,
    isBestseller: false,
  },
  {
    id: "button-jabla-set",
    name: "Button Jabla Set",
    slug: "button-jabla-set",
    category: "Baby Sets",
    description:
      "A coordinated two-piece essential set featuring a short-sleeve button-front jabla and matching bloomers with soft, non-binding elastic waistband. Made for all-day playtime, restful naps, and effortless outfit changes.",
    features: [
      "Includes button jabla shirt + matching bloomer shorts",
      "Gentle encased waist elastic that won't leave marks",
      "Lightweight, moisture-wicking organic muslin",
      "Reinforced contrast stitching for wholesale longevity",
    ],
    startingPrice: 99.0,
    sizes: [
      { id: "0-3-to-9-12", name: "0–3 to 9–12 months", price: 99.0, inStock: true },
      { id: "12-18-18-24", name: "12–18, 18–24 months", price: 110.0, inStock: true },
    ],
    image: "/products/button-jabla-set.jpg",
    fabric: "100% Pure Organic Cotton Gauze",
    careInstructions: "Machine wash cold. Tumble dry low or line dry in shade.",
    isFeatured: true,
    isBestseller: true,
  },
  {
    id: "half-sleeve-night-suit",
    name: "Half Sleeve Night Suit",
    slug: "half-sleeve-night-suit",
    category: "Baby Sets",
    description:
      "A luxury loungewear and sleep suit tailored for babies and toddlers. Consists of a half-sleeve notched collar button-down shirt paired with roomy, comfortable pyjamas. Pure muslin fabric helps maintain ideal baby body temperature through the night.",
    features: [
      "2-piece relaxed fit loungewear set",
      "Front button shirt with tailored lapel collar",
      "Roomy pyjama pants with soft elastic waistband",
      "Ultra-breathable texture prevents overheating",
    ],
    startingPrice: 144.0,
    sizes: [
      { id: "0-3-to-18-24", name: "0–3 to 18–24 months", price: 144.0, inStock: true },
    ],
    image: "/products/night-suit.jpg",
    fabric: "100% Premium Double Combed Muslin (140 GSM)",
    careInstructions: "Machine wash gentle cycle. Do not wring. Iron at medium heat.",
    isFeatured: true,
    isBestseller: true,
  },
  {
    id: "front-open-frock",
    name: "Front Open Frock",
    slug: "front-open-frock",
    category: "Baby Clothing",
    description:
      "Delicate, heirloom-quality baby girl frock featuring full front button fastening for effortless dressing without pulling over baby's sensitive head. Subtle gathers create a graceful, comfortable flare.",
    features: [
      "Full front opening with secure smooth buttons",
      "Subtle gathers with airy A-line silhouette",
      "Combed muslin fabric that floats gently on skin",
      "Ideal for celebrations, outings, and everyday comfort",
    ],
    startingPrice: 90.0,
    sizes: [
      { id: "0-3-to-6-12", name: "0–3 to 6–12 months", price: 90.0, inStock: true },
    ],
    image: "/products/front-open-frock.jpg",
    fabric: "100% Combed Muslin Voile",
    careInstructions: "Delicate hand wash recommended. Line dry flat.",
    isFeatured: false,
    isBestseller: true,
  },
  {
    id: "knotted-frock",
    name: "Knotted Frock",
    slug: "knotted-frock",
    category: "Baby Clothing",
    description:
      "Charming sleeveless summer sundress featuring tie-knot shoulder straps and an airy gathered skirt. Soft, breezy, and effortlessly elegant for warm summer afternoons and tropical breezes.",
    features: [
      "Adjustable tie shoulder bow knots",
      "Gentle flared skirt with double-stitched hem",
      "Pure organic airy cotton texture",
      "Easy slip-on and adjustment",
    ],
    startingPrice: 58.0,
    sizes: [
      { id: "nb-0-3-3-6", name: "NB, 0–3, 3–6 months", price: 58.0, inStock: true },
    ],
    image: "/products/knotted-frock.jpg",
    fabric: "100% Organic Double Gauze Muslin",
    careInstructions: "Machine wash cold with like colors. Tumble dry delicate.",
    isFeatured: true,
    isBestseller: false,
  },
  {
    id: "swaddles",
    name: "Swaddles",
    slug: "swaddles",
    category: "Swaddles & Essentials",
    description:
      "Our signature generous swaddle wrap, meticulously loomed from feather-soft organic cotton muslin. The open weave regulates temperature naturally while comforting newborns in a soothing, womb-like embrace.",
    features: [
      "Generously sized swaddling wrap",
      "Multipurpose: swaddle, nursing cover, stroller shade, burp cloth",
      "Breathable weave naturally prevents overheating",
      "Heirloom softness that improves over time",
    ],
    startingPrice: 115.0,
    sizes: [
      { id: "nb", name: "NB", price: 115.0, inStock: true },
    ],
    image: "/products/swaddles.jpg",
    fabric: "100% Pure Organic Cotton Muslin (120 GSM)",
    careInstructions: "Warm machine wash. Tumble dry low to enhance natural crinkle texture.",
    isFeatured: true,
    isBestseller: true,
  },
  {
    id: "hooded-towel",
    name: "Hooded Towel",
    slug: "hooded-towel",
    category: "Towels & Wipes",
    description:
      "Luxurious multi-layered muslin baby bath towel with an integrated triangular corner hood. Uniquely thirsty multi-layer construction absorbs water instantaneously while wrapping baby in cocooning warmth.",
    features: [
      "Corner hood protects baby's sensitive wet head",
      "Multi-layer gauze for superior instant absorption",
      "Fast drying, hygienic, and resistant to mildew",
      "Generous 75 × 75 cm coverage from newborn to toddler",
    ],
    startingPrice: 140.0,
    sizes: [
      { id: "75x75", name: "75 × 75", price: 140.0, inStock: true },
    ],
    image: "/products/hooded-towel.jpg",
    fabric: "4-Layer Quilted Pure Organic Muslin",
    careInstructions: "Machine wash warm. Tumble dry low.",
    isFeatured: true,
    isBestseller: false,
  },
  {
    id: "wipes-2-layer",
    name: "Wipes – 2 Layer",
    slug: "wipes-2-layer",
    category: "Towels & Wipes",
    description:
      "Indispensable 2-layer muslin wipes and washcloths. Exceptionally tender on delicate faces, hands, and diaper areas. A washable, eco-friendly wholesale staple for conscious parents and newborn hospitals.",
    features: [
      "2-layer ultra-absorbent organic cotton gauze",
      "Smooth overlocked border stitching",
      "Washable, reusable, and zero waste",
      "Compact 24 × 24 cm pocket size",
    ],
    startingPrice: 24.0,
    sizes: [
      { id: "24x24", name: "24 × 24", price: 24.0, inStock: true },
    ],
    image: "/products/wipes.jpg",
    fabric: "2-Layer 100% Pure Combed Cotton Muslin",
    careInstructions: "Machine wash warm. Bleach-free. Air dry quickly.",
    isFeatured: false,
    isBestseller: true,
  },
  {
    id: "cap-mittens-booties",
    name: "Cap, Mittens & Booties",
    slug: "cap-mittens-booties",
    category: "Accessories",
    description:
      "The quintessential newborn trio crafted from heavenly soft muslin cotton. Includes a gentle adjustable top-knot beanie, snug scratch mittens to protect tender cheeks, and stay-on booties with soft ankle cuff.",
    features: [
      "Complete 3-piece newborn hospital kit",
      "Soft adjustable top-knot beanie cap",
      "Gentle elasticated scratch mittens",
      "Cozy stay-on muslin booties",
    ],
    startingPrice: 100.0,
    sizes: [
      { id: "nb", name: "NB", price: 100.0, inStock: true },
    ],
    image: "/products/cap-mittens-booties.jpg",
    fabric: "100% Organic Double Gauze Muslin",
    careInstructions: "Delicate machine wash or gentle hand wash. Lay flat to dry.",
    isFeatured: true,
    isBestseller: true,
  },
];
