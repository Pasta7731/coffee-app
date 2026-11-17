import { Chip, colors } from "@/components/coffee-ui";
import { useCoffee } from "@/context/coffee-context";
import { formatBaht, MenuCategory, menuItems } from "@/data/menu";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const categories: Array<MenuCategory | "ทั้งหมด"> = [
  "ทั้งหมด",
  "Coffee",
  "Non-coffee",
  "Bakery",
];
const categoryText: Record<string, string> = {
  ทั้งหมด: "ทั้งหมด",
  Coffee: "กาแฟ",
  "Non-coffee": "ไม่ใช่กาแฟ",
  Bakery: "เบเกอรี่",
};
export default function MenuScreen() {
  const [category, setCategory] = useState<MenuCategory | "ทั้งหมด">("ทั้งหมด");
  const { isOpen, count } = useCoffee();
  const filtered =
    category === "ทั้งหมด"
      ? menuItems
      : menuItems.filter((item) => item.category === category);
  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {categories.map((item) => (
            <Chip
              key={item}
              label={categoryText[item]}
              selected={category === item}
              onPress={() => setCategory(item)}
            />
          ))}
        </ScrollView>
        {!isOpen && (
          <View
            style={{
              marginTop: 18,
              padding: 14,
              borderRadius: 14,
              backgroundColor: "#F2E5E0",
            }}
          >
            <Text style={{ color: colors.ink, fontWeight: "700" }}>
              ร้านปิดอยู่ แต่คุณยังดูเมนูสำหรับครั้งหน้าได้
            </Text>
          </View>
        )}
        <View style={{ marginTop: 20, gap: 12 }}>
          {filtered.map((item) => (
            <Pressable
              key={item.id}
              disabled={!isOpen}
              onPress={() =>
                router.push({ pathname: "/customize", params: { id: item.id } })
              }
              style={({ pressed }) => ({
                backgroundColor: colors.paper,
                borderWidth: 1,
                borderColor: colors.line,
                borderRadius: 20,
                overflow: "hidden",
                flexDirection: "row",
                opacity: pressed ? 0.75 : isOpen ? 1 : 0.55,
              })}
            >
              <View
                style={{
                  width: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: item.color,
                }}
              >
                <Text style={{ fontSize: 42 }}>{item.emoji}</Text>
              </View>
              <View style={{ flex: 1, padding: 15 }}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Text
                    style={{
                      color: colors.ink,
                      fontWeight: "800",
                      fontSize: 17,
                    }}
                  >
                    {item.thaiName}
                  </Text>
                  {item.isNew && (
                    <Text
                      style={{
                        color: colors.green,
                        fontWeight: "800",
                        fontSize: 11,
                      }}
                    >
                      NEW
                    </Text>
                  )}
                </View>
                <Text
                  style={{
                    color: colors.muted,
                    fontSize: 13,
                    lineHeight: 19,
                    marginTop: 4,
                  }}
                >
                  {item.description}
                </Text>
                <Text
                  style={{
                    color: colors.green,
                    fontWeight: "800",
                    marginTop: 10,
                  }}
                >
                  {formatBaht(item.price)}{" "}
                  <Text style={{ color: colors.muted, fontWeight: "400" }}>
                    · แตะเพื่อเลือก
                  </Text>
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <Pressable
        onPress={() => router.push("/cart")}
        style={{
          position: "absolute",
          right: 20,
          bottom: 25,
          backgroundColor: colors.green,
          borderRadius: 25,
          paddingVertical: 13,
          paddingHorizontal: 17,
        }}
      >
        <Text style={{ color: "white", fontWeight: "800" }}>
          ตะกร้า {count} รายการ
        </Text>
      </Pressable>
    </View>
  );
}
