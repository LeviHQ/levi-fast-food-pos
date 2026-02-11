import burgerImg from "@/assets/burger.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import friesImg from "@/assets/fries.jpg";
import drinkImg from "@/assets/drink.jpg";

export type Category = "Burger" | "Pizza" | "Combo" | "Drinks" | "Sides" | "Desserts";

export interface FoodItem {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  stock: number;
  description: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountType: "percent" | "flat";
  discountValue: number;
  discountAmount: number;
  total: number;
  paymentMethod: "cash" | "upi" | "card";
  paymentStatus: "paid" | "pending";
  cashReceived?: number;
  changeAmount?: number;
  customerName: string;
  date: string;
  time: string;
}

export interface AppSettings {
  taxRate: number;
  restaurantName: string;
  logoUrl: string;
  currency: string;
  currencySymbol: string;
}

export const categories: Category[] = ["Burger", "Pizza", "Combo", "Drinks", "Sides", "Desserts"];

export const defaultSettings: AppSettings = {
  taxRate: 5,
  restaurantName: "Levi Fast Food",
  logoUrl: "",
  currency: "INR",
  currencySymbol: "₹",
};

export const sampleMenuItems: FoodItem[] = [
  { id: "1", name: "Classic Cheeseburger", category: "Burger", price: 149, image: burgerImg, stock: 50, description: "Juicy beef patty with melted cheddar" },
  { id: "2", name: "Double Smash Burger", category: "Burger", price: 229, image: burgerImg, stock: 35, description: "Two smashed patties with special sauce" },
  { id: "3", name: "Chicken Burger", category: "Burger", price: 179, image: burgerImg, stock: 40, description: "Crispy chicken fillet with lettuce" },
  { id: "4", name: "Pepperoni Pizza", category: "Pizza", price: 299, image: pizzaImg, stock: 25, description: "Classic pepperoni with mozzarella" },
  { id: "5", name: "Margherita Pizza", category: "Pizza", price: 249, image: pizzaImg, stock: 30, description: "Fresh basil, tomato & mozzarella" },
  { id: "6", name: "BBQ Chicken Pizza", category: "Pizza", price: 349, image: pizzaImg, stock: 20, description: "BBQ chicken with red onions" },
  { id: "7", name: "Burger + Fries Combo", category: "Combo", price: 249, image: burgerImg, stock: 30, description: "Cheeseburger with large fries" },
  { id: "8", name: "Pizza + Drink Combo", category: "Combo", price: 379, image: pizzaImg, stock: 20, description: "Personal pizza with a cold drink" },
  { id: "9", name: "Cola", category: "Drinks", price: 49, image: drinkImg, stock: 100, description: "Chilled cola 300ml" },
  { id: "10", name: "Lemonade", category: "Drinks", price: 59, image: drinkImg, stock: 80, description: "Fresh squeezed lemonade" },
  { id: "11", name: "Iced Tea", category: "Drinks", price: 69, image: drinkImg, stock: 60, description: "Peach iced tea" },
  { id: "12", name: "French Fries", category: "Sides", price: 89, image: friesImg, stock: 70, description: "Crispy golden fries" },
  { id: "13", name: "Onion Rings", category: "Sides", price: 99, image: friesImg, stock: 45, description: "Crispy beer-battered onion rings" },
  { id: "14", name: "Chocolate Brownie", category: "Desserts", price: 119, image: friesImg, stock: 25, description: "Warm fudge brownie" },
  { id: "15", name: "Ice Cream Sundae", category: "Desserts", price: 139, image: drinkImg, stock: 30, description: "Vanilla sundae with toppings" },
];

export const sampleOrders: Order[] = [
  {
    id: "ORD-001", items: [{ ...sampleMenuItems[0], quantity: 2 }, { ...sampleMenuItems[8], quantity: 2 }],
    subtotal: 396, taxRate: 5, taxAmount: 19.8, discountType: "percent", discountValue: 0, discountAmount: 0,
    total: 415.8, paymentMethod: "cash", paymentStatus: "paid", cashReceived: 500, changeAmount: 84.2,
    customerName: "Rahul", date: "2026-02-11", time: "10:30 AM",
  },
  {
    id: "ORD-002", items: [{ ...sampleMenuItems[3], quantity: 1 }, { ...sampleMenuItems[9], quantity: 1 }],
    subtotal: 358, taxRate: 5, taxAmount: 17.9, discountType: "flat", discountValue: 20, discountAmount: 20,
    total: 355.9, paymentMethod: "upi", paymentStatus: "paid",
    customerName: "Priya", date: "2026-02-11", time: "11:15 AM",
  },
  {
    id: "ORD-003", items: [{ ...sampleMenuItems[6], quantity: 3 }],
    subtotal: 747, taxRate: 5, taxAmount: 37.35, discountType: "percent", discountValue: 10, discountAmount: 74.7,
    total: 709.65, paymentMethod: "card", paymentStatus: "paid",
    customerName: "Amit", date: "2026-02-11", time: "12:45 PM",
  },
  {
    id: "ORD-004", items: [{ ...sampleMenuItems[1], quantity: 1 }, { ...sampleMenuItems[11], quantity: 1 }, { ...sampleMenuItems[8], quantity: 1 }],
    subtotal: 367, taxRate: 5, taxAmount: 18.35, discountType: "percent", discountValue: 0, discountAmount: 0,
    total: 385.35, paymentMethod: "cash", paymentStatus: "paid", cashReceived: 400, changeAmount: 14.65,
    customerName: "Sara", date: "2026-02-10", time: "02:30 PM",
  },
  {
    id: "ORD-005", items: [{ ...sampleMenuItems[4], quantity: 2 }, { ...sampleMenuItems[10], quantity: 2 }],
    subtotal: 636, taxRate: 5, taxAmount: 31.8, discountType: "percent", discountValue: 5, discountAmount: 31.8,
    total: 636, paymentMethod: "upi", paymentStatus: "paid",
    customerName: "Karan", date: "2026-02-10", time: "06:00 PM",
  },
];

export function generateOrderId(): string {
  return `ORD-${String(Math.floor(Math.random() * 99999)).padStart(5, "0")}`;
}

export function getCurrentDate(): string {
  return new Date().toISOString().split("T")[0];
}

export function getCurrentTime(): string {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}
