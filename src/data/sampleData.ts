import burgerImg from "@/assets/burger.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import friesImg from "@/assets/fries.jpg";
import drinkImg from "@/assets/drink.jpg";
import wrapImg from "@/assets/wrap.jpg";
import sandwichImg from "@/assets/sandwich.jpg";
import momosImg from "@/assets/momos.jpg";
import indianSnackImg from "@/assets/indian-snack.jpg";
import pastaImg from "@/assets/pasta.jpg";
import riceBowlImg from "@/assets/rice-bowl.jpg";
import nuggetsImg from "@/assets/nuggets.jpg";
import dessertImg from "@/assets/dessert.jpg";
import shakeImg from "@/assets/shake.jpg";
import nachosImg from "@/assets/nachos.jpg";

export type Category = "Burger" | "Pizza" | "Combo" | "Drinks" | "Sides" | "Desserts" | "Wraps" | "Sandwich" | "Momos" | "Indian Snacks" | "Pasta" | "Rice Bowl";

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

export const categories: Category[] = ["Burger", "Pizza", "Combo", "Drinks", "Sides", "Desserts", "Wraps", "Sandwich", "Momos", "Indian Snacks", "Pasta", "Rice Bowl"];

export const defaultSettings: AppSettings = {
  taxRate: 5,
  restaurantName: "Levi Fast Food",
  logoUrl: "",
  currency: "INR",
  currencySymbol: "₹",
};

export const sampleMenuItems: FoodItem[] = [
  // Burgers
  { id: "1", name: "Classic Cheeseburger", category: "Burger", price: 149, image: burgerImg, stock: 50, description: "Juicy beef patty with melted cheddar" },
  { id: "2", name: "Double Smash Burger", category: "Burger", price: 229, image: burgerImg, stock: 35, description: "Two smashed patties with special sauce" },
  { id: "3", name: "Chicken Burger", category: "Burger", price: 179, image: burgerImg, stock: 40, description: "Crispy chicken fillet with lettuce" },
  { id: "16", name: "Veggie Burger", category: "Burger", price: 129, image: burgerImg, stock: 30, description: "Grilled veggie patty with fresh veggies" },
  { id: "17", name: "Spicy Zinger Burger", category: "Burger", price: 199, image: burgerImg, stock: 45, description: "Spicy crispy chicken with jalapeño mayo" },
  { id: "18", name: "Mushroom Swiss Burger", category: "Burger", price: 219, image: burgerImg, stock: 25, description: "Sautéed mushrooms with Swiss cheese" },
  { id: "19", name: "Paneer Tikka Burger", category: "Burger", price: 159, image: burgerImg, stock: 40, description: "Tandoori paneer patty with mint chutney" },
  { id: "20", name: "Fish Burger", category: "Burger", price: 189, image: burgerImg, stock: 20, description: "Crispy fish fillet with tartar sauce" },
  { id: "21", name: "BBQ Bacon Burger", category: "Burger", price: 259, image: burgerImg, stock: 30, description: "Smoky BBQ sauce with crispy bacon" },

  // Pizza
  { id: "4", name: "Pepperoni Pizza", category: "Pizza", price: 299, image: pizzaImg, stock: 25, description: "Classic pepperoni with mozzarella" },
  { id: "5", name: "Margherita Pizza", category: "Pizza", price: 249, image: pizzaImg, stock: 30, description: "Fresh basil, tomato & mozzarella" },
  { id: "6", name: "BBQ Chicken Pizza", category: "Pizza", price: 349, image: pizzaImg, stock: 20, description: "BBQ chicken with red onions" },
  { id: "22", name: "Farmhouse Pizza", category: "Pizza", price: 279, image: pizzaImg, stock: 25, description: "Capsicum, onion, tomato & mushroom" },
  { id: "23", name: "Paneer Makhani Pizza", category: "Pizza", price: 319, image: pizzaImg, stock: 20, description: "Creamy makhani sauce with paneer chunks" },
  { id: "24", name: "Mexican Wave Pizza", category: "Pizza", price: 339, image: pizzaImg, stock: 18, description: "Spicy Mexican toppings with jalapeños" },
  { id: "25", name: "Chicken Tikka Pizza", category: "Pizza", price: 359, image: pizzaImg, stock: 22, description: "Tandoori chicken tikka with onions" },
  { id: "26", name: "Cheese Burst Pizza", category: "Pizza", price: 399, image: pizzaImg, stock: 15, description: "Extra cheese stuffed crust" },

  // Combos
  { id: "7", name: "Burger + Fries Combo", category: "Combo", price: 249, image: burgerImg, stock: 30, description: "Cheeseburger with large fries" },
  { id: "8", name: "Pizza + Drink Combo", category: "Combo", price: 379, image: pizzaImg, stock: 20, description: "Personal pizza with a cold drink" },
  { id: "27", name: "Family Feast Combo", category: "Combo", price: 799, image: pizzaImg, stock: 10, description: "2 pizzas, 4 drinks, large fries" },
  { id: "28", name: "Duo Burger Combo", category: "Combo", price: 399, image: burgerImg, stock: 20, description: "2 burgers, 2 fries, 2 drinks" },
  { id: "29", name: "Snack Box Combo", category: "Combo", price: 299, image: friesImg, stock: 25, description: "Nuggets, fries, onion rings & dip" },
  { id: "30", name: "Kids Meal Combo", category: "Combo", price: 199, image: burgerImg, stock: 35, description: "Mini burger, small fries & juice" },

  // Drinks
  { id: "9", name: "Cola", category: "Drinks", price: 49, image: drinkImg, stock: 100, description: "Chilled cola 300ml" },
  { id: "10", name: "Lemonade", category: "Drinks", price: 59, image: drinkImg, stock: 80, description: "Fresh squeezed lemonade" },
  { id: "11", name: "Iced Tea", category: "Drinks", price: 69, image: drinkImg, stock: 60, description: "Peach iced tea" },
  { id: "31", name: "Mango Shake", category: "Drinks", price: 99, image: shakeImg, stock: 50, description: "Thick mango milkshake" },
  { id: "32", name: "Cold Coffee", category: "Drinks", price: 89, image: shakeImg, stock: 55, description: "Creamy iced cold coffee" },
  { id: "33", name: "Oreo Shake", category: "Drinks", price: 119, image: shakeImg, stock: 40, description: "Blended Oreo cookie milkshake" },
  { id: "34", name: "Fresh Orange Juice", category: "Drinks", price: 79, image: drinkImg, stock: 45, description: "100% fresh squeezed orange" },
  { id: "35", name: "Mojito", category: "Drinks", price: 89, image: drinkImg, stock: 50, description: "Virgin mojito with mint & lime" },
  { id: "36", name: "Masala Chai", category: "Drinks", price: 39, image: drinkImg, stock: 100, description: "Hot Indian masala tea" },
  { id: "37", name: "Hot Chocolate", category: "Drinks", price: 109, image: shakeImg, stock: 30, description: "Rich Belgian hot chocolate" },

  // Sides
  { id: "12", name: "French Fries", category: "Sides", price: 89, image: friesImg, stock: 70, description: "Crispy golden fries" },
  { id: "13", name: "Onion Rings", category: "Sides", price: 99, image: friesImg, stock: 45, description: "Crispy beer-battered onion rings" },
  { id: "38", name: "Chicken Nuggets (6pc)", category: "Sides", price: 129, image: nuggetsImg, stock: 50, description: "Golden fried chicken nuggets" },
  { id: "39", name: "Cheese Garlic Bread", category: "Sides", price: 109, image: friesImg, stock: 40, description: "Toasted garlic bread with cheese" },
  { id: "40", name: "Peri Peri Fries", category: "Sides", price: 109, image: friesImg, stock: 55, description: "Fries tossed in peri peri spice" },
  { id: "41", name: "Loaded Nachos", category: "Sides", price: 149, image: nachosImg, stock: 30, description: "Nachos with cheese, salsa & sour cream" },
  { id: "42", name: "Chicken Wings (4pc)", category: "Sides", price: 169, image: nuggetsImg, stock: 35, description: "Spicy buffalo wings with dip" },
  { id: "43", name: "Mozzarella Sticks", category: "Sides", price: 139, image: nuggetsImg, stock: 30, description: "Crispy mozzarella with marinara" },
  { id: "44", name: "Coleslaw", category: "Sides", price: 49, image: friesImg, stock: 60, description: "Fresh creamy coleslaw" },

  // Desserts
  { id: "14", name: "Chocolate Brownie", category: "Desserts", price: 119, image: dessertImg, stock: 25, description: "Warm fudge brownie" },
  { id: "15", name: "Ice Cream Sundae", category: "Desserts", price: 139, image: dessertImg, stock: 30, description: "Vanilla sundae with toppings" },
  { id: "45", name: "Gulab Jamun (2pc)", category: "Desserts", price: 69, image: dessertImg, stock: 40, description: "Soft deep-fried milk dumplings" },
  { id: "46", name: "Chocolate Lava Cake", category: "Desserts", price: 159, image: dessertImg, stock: 20, description: "Molten chocolate center cake" },
  { id: "47", name: "Cheesecake Slice", category: "Desserts", price: 179, image: dessertImg, stock: 15, description: "New York style baked cheesecake" },
  { id: "48", name: "Apple Pie", category: "Desserts", price: 99, image: dessertImg, stock: 25, description: "Warm apple pie with cinnamon" },
  { id: "49", name: "Rasgulla (2pc)", category: "Desserts", price: 59, image: dessertImg, stock: 35, description: "Soft spongy cottage cheese balls" },
  { id: "50", name: "Tiramisu", category: "Desserts", price: 199, image: dessertImg, stock: 12, description: "Classic Italian coffee dessert" },

  // Wraps
  { id: "51", name: "Chicken Shawarma Wrap", category: "Wraps", price: 159, image: wrapImg, stock: 40, description: "Juicy chicken shawarma with garlic sauce" },
  { id: "52", name: "Paneer Tikka Wrap", category: "Wraps", price: 139, image: wrapImg, stock: 35, description: "Grilled paneer with mint chutney in tortilla" },
  { id: "53", name: "Falafel Wrap", category: "Wraps", price: 129, image: wrapImg, stock: 30, description: "Crispy falafel with hummus & veggies" },
  { id: "54", name: "Egg Roll Wrap", category: "Wraps", price: 99, image: wrapImg, stock: 50, description: "Kolkata style egg roll with onions" },
  { id: "55", name: "Tandoori Chicken Wrap", category: "Wraps", price: 169, image: wrapImg, stock: 25, description: "Smoky tandoori chicken in rumali roti" },

  // Sandwich
  { id: "56", name: "Grilled Cheese Sandwich", category: "Sandwich", price: 89, image: sandwichImg, stock: 50, description: "Melted cheese between toasted bread" },
  { id: "57", name: "Club Sandwich", category: "Sandwich", price: 149, image: sandwichImg, stock: 35, description: "Triple layer with chicken, egg & veggies" },
  { id: "58", name: "Veg Mayo Sandwich", category: "Sandwich", price: 79, image: sandwichImg, stock: 45, description: "Fresh veggies with creamy mayo" },
  { id: "59", name: "Paneer Tikka Sandwich", category: "Sandwich", price: 119, image: sandwichImg, stock: 30, description: "Spicy grilled paneer with peppers" },
  { id: "60", name: "Chicken Tikka Sandwich", category: "Sandwich", price: 139, image: sandwichImg, stock: 30, description: "Juicy chicken tikka with mint sauce" },

  // Momos
  { id: "61", name: "Steamed Veg Momos (8pc)", category: "Momos", price: 89, image: momosImg, stock: 60, description: "Classic steamed veg dumplings" },
  { id: "62", name: "Steamed Chicken Momos (8pc)", category: "Momos", price: 109, image: momosImg, stock: 50, description: "Tender chicken filled dumplings" },
  { id: "63", name: "Fried Momos (8pc)", category: "Momos", price: 119, image: momosImg, stock: 45, description: "Crispy fried momos with schezwan dip" },
  { id: "64", name: "Tandoori Momos (8pc)", category: "Momos", price: 139, image: momosImg, stock: 35, description: "Chargrilled momos with spicy coating" },
  { id: "65", name: "Kurkure Momos (8pc)", category: "Momos", price: 129, image: momosImg, stock: 40, description: "Extra crunchy coated fried momos" },
  { id: "66", name: "Paneer Momos (8pc)", category: "Momos", price: 99, image: momosImg, stock: 45, description: "Soft paneer stuffed momos" },

  // Indian Snacks
  { id: "67", name: "Samosa (2pc)", category: "Indian Snacks", price: 39, image: indianSnackImg, stock: 80, description: "Crispy potato filled samosa" },
  { id: "68", name: "Aloo Tikki", category: "Indian Snacks", price: 49, image: indianSnackImg, stock: 60, description: "Spiced potato patties with chutney" },
  { id: "69", name: "Pav Bhaji", category: "Indian Snacks", price: 99, image: indianSnackImg, stock: 40, description: "Spicy mashed veggies with buttered pav" },
  { id: "70", name: "Chole Bhature", category: "Indian Snacks", price: 119, image: indianSnackImg, stock: 35, description: "Spicy chickpeas with fried bread" },
  { id: "71", name: "Vada Pav", category: "Indian Snacks", price: 29, image: indianSnackImg, stock: 100, description: "Mumbai's iconic potato fritter burger" },
  { id: "72", name: "Dahi Puri (6pc)", category: "Indian Snacks", price: 59, image: indianSnackImg, stock: 50, description: "Crispy puris with yogurt & chutneys" },
  { id: "73", name: "Spring Roll (4pc)", category: "Indian Snacks", price: 89, image: indianSnackImg, stock: 40, description: "Crispy rolls with veggie filling" },

  // Pasta
  { id: "74", name: "Penne Arrabbiata", category: "Pasta", price: 179, image: pastaImg, stock: 30, description: "Penne in spicy tomato sauce" },
  { id: "75", name: "Alfredo Pasta", category: "Pasta", price: 199, image: pastaImg, stock: 25, description: "Creamy white sauce pasta" },
  { id: "76", name: "Mac & Cheese", category: "Pasta", price: 169, image: pastaImg, stock: 30, description: "Cheesy baked macaroni" },
  { id: "77", name: "Chicken Pasta", category: "Pasta", price: 219, image: pastaImg, stock: 20, description: "Grilled chicken in pink sauce pasta" },
  { id: "78", name: "Pesto Pasta", category: "Pasta", price: 189, image: pastaImg, stock: 25, description: "Basil pesto with parmesan" },

  // Rice Bowl
  { id: "79", name: "Chicken Fried Rice", category: "Rice Bowl", price: 149, image: riceBowlImg, stock: 35, description: "Wok tossed rice with chicken & veggies" },
  { id: "80", name: "Veg Fried Rice", category: "Rice Bowl", price: 119, image: riceBowlImg, stock: 40, description: "Stir fried rice with mixed vegetables" },
  { id: "81", name: "Paneer Tikka Rice Bowl", category: "Rice Bowl", price: 169, image: riceBowlImg, stock: 25, description: "Flavoured rice topped with paneer tikka" },
  { id: "82", name: "Chicken Biryani", category: "Rice Bowl", price: 199, image: riceBowlImg, stock: 30, description: "Aromatic basmati rice with spiced chicken" },
  { id: "83", name: "Rajma Chawal Bowl", category: "Rice Bowl", price: 109, image: riceBowlImg, stock: 35, description: "Kidney bean curry with steamed rice" },
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
