import { MenuItem } from "@/data/menu";
import {
  createContext,
  PropsWithChildren,
  use,
  useMemo,
  useState,
} from "react";
export type CartItem = {
  id: string;
  item: MenuItem;
  quantity: number;
  size?: "ปกติ" | "ใหญ่";
  sweetness?: "หวานปกติ" | "หวานน้อย" | "ไม่หวาน";
  topping?: string;
};
type CoffeeContextValue = {
  cart: CartItem[];
  isOpen: boolean;
  addItem: (
    item: MenuItem,
    options?: Omit<CartItem, "id" | "item" | "quantity">,
  ) => void;
  updateQuantity: (id: string, change: number) => void;
  clearCart: () => void;
  toggleStore: () => void;
  total: number;
  count: number;
};
const CoffeeContext = createContext<CoffeeContextValue | null>(null);
export function CoffeeProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const addItem: CoffeeContextValue["addItem"] = (item, options = {}) => {
    const id = `${item.id}-${options.size ?? ""}-${options.sweetness ?? ""}-${options.topping ?? ""}`;
    setCart((current) => {
      const existing = current.find((entry) => entry.id === id);
      return existing
        ? current.map((entry) =>
            entry.id === id
              ? { ...entry, quantity: entry.quantity + 1 }
              : entry,
          )
        : [...current, { id, item, quantity: 1, ...options }];
    });
  };
  const updateQuantity = (id: string, change: number) =>
    setCart((current) =>
      current.flatMap((entry) =>
        entry.id !== id
          ? [entry]
          : entry.quantity + change > 0
            ? [{ ...entry, quantity: entry.quantity + change }]
            : [],
      ),
    );
  const value = useMemo(
    () => ({
      cart,
      isOpen,
      addItem,
      updateQuantity,
      clearCart: () => setCart([]),
      toggleStore: () => setIsOpen((open) => !open),
      total: cart.reduce(
        (sum, entry) => sum + entry.item.price * entry.quantity,
        0,
      ),
      count: cart.reduce((sum, entry) => sum + entry.quantity, 0),
    }),
    [cart, isOpen],
  );
  return <CoffeeContext value={value}>{children}</CoffeeContext>;
}
export function useCoffee() {
  const value = use(CoffeeContext);
  if (!value) throw new Error("useCoffee must be used within CoffeeProvider");
  return value;
}
