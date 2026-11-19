// Configuration for Ranji Textiles Wholesale Store
export interface StoreConfig {
  brandName: string;
  tagline: string;
  subtagline: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  location: string;
  address: string;
  currency: {
    symbol: string;
    code: string;
  };
  wholesaleSettings: {
    minOrderQuantity: number; // Minimum order quantity for wholesale orders
    freeShippingThreshold: number;
    flatShippingFee: number;
    gstRate: number; // Configurable tax rate if needed (0 by default)
  };
}

export const STORE_CONFIG: StoreConfig = {
  brandName: "RANJI TEXTILES",
  tagline: "Thoughtfully Crafted Muslin Essentials for Little Ones",
  subtagline: "Premium wholesale muslin products, thoughtfully crafted for little ones in Tiruppur.",
  email: "ranjitextilestrp@gmail.com",
  phone: "9626888375",
  whatsappNumber: "919626888375",
  location: "Tiruppur, Tamil Nadu",
  address: "Textile City Industrial Hub, Tiruppur, Tamil Nadu - 641602, India",
  currency: {
    symbol: "₹",
    code: "INR",
  },
  wholesaleSettings: {
    minOrderQuantity: 10, // Configurable minimum units
    freeShippingThreshold: 3000,
    flatShippingFee: 150,
    gstRate: 0, // Configurable until business rules are confirmed
  },
};
