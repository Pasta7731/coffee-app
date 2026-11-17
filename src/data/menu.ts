export type MenuCategory = "Coffee" | "Non-coffee" | "Bakery";
export type MenuItem = {
  id: string;
  name: string;
  thaiName: string;
  description: string;
  price: number;
  category: MenuCategory;
  emoji: string;
  color: string;
  isNew?: boolean;
  isPopular?: boolean;
  customizable: boolean;
};
export const menuItems: MenuItem[] = [
  {
    id: "brown-sugar-latte",
    name: "Brown sugar latte",
    thaiName: "บราวน์ชูการ์ลาเต้",
    description: "เอสเพรสโซ นมสด และบราวน์ชูการ์หอมละมุน",
    price: 75,
    category: "Coffee",
    emoji: "☕",
    color: "#E6C6A8",
    isPopular: true,
    customizable: true,
  },
  {
    id: "iced-matcha",
    name: "Iced matcha",
    thaiName: "มัทฉะลาเต้",
    description: "มัทฉะเกรดพิธีการ นมสด และความหวานพอดี",
    price: 85,
    category: "Non-coffee",
    emoji: "🍵",
    color: "#BFD1A8",
    isPopular: true,
    customizable: true,
  },
  {
    id: "dirty",
    name: "Dirty",
    thaiName: "เดอร์ตี้",
    description: "นมเย็นจัด ราดช็อตเอสเพรสโซเข้มข้น",
    price: 85,
    category: "Coffee",
    emoji: "🥛",
    color: "#DCC7B0",
    isNew: true,
    customizable: true,
  },
  {
    id: "orange-black",
    name: "Orange black",
    thaiName: "ออเรนจ์แบล็ก",
    description: "อเมริกาโน่เย็นกับน้ำส้มคั้นสด",
    price: 80,
    category: "Coffee",
    emoji: "🍊",
    color: "#F4C285",
    isNew: true,
    customizable: true,
  },
  {
    id: "butter-croissant",
    name: "Butter croissant",
    thaiName: "ครัวซองต์เนยสด",
    description: "อบใหม่ทุกเช้า หอมเนยฝรั่งเศส",
    price: 65,
    category: "Bakery",
    emoji: "🥐",
    color: "#ECCD93",
    customizable: false,
  },
  {
    id: "banana-bread",
    name: "Banana bread",
    thaiName: "เค้กกล้วยหอม",
    description: "เค้กกล้วยหอมเนื้อนุ่ม วอลนัตกรุบกรอบ",
    price: 70,
    category: "Bakery",
    emoji: "🍞",
    color: "#D9BA81",
    customizable: false,
  },
];
export const formatBaht = (value: number) =>
  `฿${value.toLocaleString("th-TH")}`;
