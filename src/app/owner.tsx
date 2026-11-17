import { colors, PrimaryButton, SectionTitle } from "@/components/coffee-ui";
import { useCoffee } from "@/context/coffee-context";
import { menuItems } from "@/data/menu";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
export default function OwnerScreen() {
  const { isOpen, toggleStore } = useCoffee();
  const [available, setAvailable] = useState(
    () => new Set(menuItems.map((item) => item.id)),
  );
  const toggleItem = (id: string) =>
    setAvailable((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: 20, paddingBottom: 35 }}
      >
        <View
          style={{
            borderRadius: 22,
            padding: 20,
            backgroundColor: isOpen ? colors.paleGreen : "#F2E5E0",
          }}
        >
          <Text style={{ color: colors.muted, fontWeight: "700" }}>
            สถานะร้านตอนนี้
          </Text>
          <Text
            style={{
              color: colors.ink,
              fontSize: 25,
              fontWeight: "900",
              marginTop: 5,
            }}
          >
            {isOpen ? "กำลังเปิดรับออเดอร์" : "ปิดรับออเดอร์"}
          </Text>
          <Text style={{ color: colors.muted, marginTop: 5 }}>
            {isOpen
              ? "ลูกค้าสามารถสั่งล่วงหน้าได้"
              : "ลูกค้าจะดูเมนูได้ แต่สั่งไม่ได้"}
          </Text>
          <View style={{ marginTop: 17 }}>
            <PrimaryButton
              label={isOpen ? "ปิดรับออเดอร์ชั่วคราว" : "เปิดรับออเดอร์"}
              onPress={toggleStore}
            />
          </View>
        </View>
        <SectionTitle title="เมนูที่ขายวันนี้" />
        <Text style={{ color: colors.muted, marginTop: -7, marginBottom: 12 }}>
          แตะเพื่อซ่อนหรือเปิดขายเมนูนั้นทันที
        </Text>
        {menuItems.map((item) => {
          const active = available.has(item.id);
          return (
            <Pressable
              key={item.id}
              onPress={() => toggleItem(item.id)}
              style={{
                padding: 15,
                borderRadius: 16,
                backgroundColor: colors.paper,
                borderWidth: 1,
                borderColor: colors.line,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginBottom: 9,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 13,
                  backgroundColor: item.color,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 23 }}>{item.emoji}</Text>
              </View>
              <Text style={{ color: colors.ink, fontWeight: "800", flex: 1 }}>
                {item.thaiName}
              </Text>
              <View
                style={{
                  backgroundColor: active ? colors.paleGreen : "#F1EEE8",
                  paddingHorizontal: 10,
                  paddingVertical: 7,
                  borderRadius: 99,
                }}
              >
                <Text
                  style={{
                    color: active ? colors.green : colors.muted,
                    fontWeight: "800",
                    fontSize: 12,
                  }}
                >
                  {active ? "กำลังขาย" : "ซ่อนอยู่"}
                </Text>
              </View>
            </Pressable>
          );
        })}
        <SectionTitle title="ออเดอร์ล่าสุด" />
        <View
          style={{
            padding: 16,
            borderRadius: 18,
            backgroundColor: colors.paper,
            borderWidth: 1,
            borderColor: colors.line,
          }}
        >
          <Text style={{ color: colors.ink, fontWeight: "800" }}>
            G-042 · มายด์
          </Text>
          <Text style={{ color: colors.muted, marginTop: 5 }}>
            บราวน์ชูการ์ลาเต้ · หวานน้อย
          </Text>
          <Text
            style={{ color: colors.green, fontWeight: "800", marginTop: 11 }}
          >
            รอรับออเดอร์
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
