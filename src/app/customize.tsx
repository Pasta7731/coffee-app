import {
  Chip,
  colors,
  PrimaryButton,
  SectionTitle,
} from "@/components/coffee-ui";
import { useCoffee } from "@/context/coffee-context";
import { formatBaht, menuItems } from "@/data/menu";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function CustomizeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = menuItems.find((entry) => entry.id === id) ?? menuItems[0];
  const { addItem, isOpen } = useCoffee();
  const [size, setSize] = useState<"ปกติ" | "ใหญ่">("ปกติ");
  const [sweetness, setSweetness] = useState<
    "หวานปกติ" | "หวานน้อย" | "ไม่หวาน"
  >("หวานน้อย");
  const [topping, setTopping] = useState("ไม่เพิ่ม");
  const extra = size === "ใหญ่" ? 15 : 0;
  const submit = () => {
    addItem(item, item.customizable ? { size, sweetness, topping } : {});
    router.push("/cart");
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
      >
        <View
          style={{
            height: 190,
            borderRadius: 26,
            backgroundColor: item.color,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 86 }}>{item.emoji}</Text>
        </View>
        <Text
          style={{
            fontSize: 27,
            color: colors.ink,
            fontWeight: "900",
            marginTop: 20,
          }}
        >
          {item.thaiName}
        </Text>
        <Text
          style={{
            color: colors.muted,
            fontSize: 15,
            lineHeight: 21,
            marginTop: 5,
          }}
        >
          {item.description}
        </Text>
        <Text
          style={{
            color: colors.green,
            fontSize: 19,
            fontWeight: "800",
            marginTop: 10,
          }}
        >
          {formatBaht(item.price + extra)}
        </Text>
        {item.customizable && (
          <>
            <SectionTitle title="ขนาดแก้ว" />
            <View style={{ flexDirection: "row", gap: 9 }}>
              <Chip
                label="ปกติ"
                selected={size === "ปกติ"}
                onPress={() => setSize("ปกติ")}
              />
              <Chip
                label="ใหญ่ +฿15"
                selected={size === "ใหญ่"}
                onPress={() => setSize("ใหญ่")}
              />
            </View>
            <SectionTitle title="ระดับความหวาน" />
            <View style={{ flexDirection: "row", gap: 9, flexWrap: "wrap" }}>
              {(["หวานปกติ", "หวานน้อย", "ไม่หวาน"] as const).map((option) => (
                <Chip
                  key={option}
                  label={option}
                  selected={sweetness === option}
                  onPress={() => setSweetness(option)}
                />
              ))}
            </View>
            <SectionTitle title="เพิ่มท็อปปิ้ง" />
            <View style={{ flexDirection: "row", gap: 9, flexWrap: "wrap" }}>
              {["ไม่เพิ่ม", "ช็อตเอสเพรสโซ +฿15", "โอ๊ตมิลก์ +฿20"].map(
                (option) => (
                  <Chip
                    key={option}
                    label={option}
                    selected={topping === option}
                    onPress={() => setTopping(option)}
                  />
                ),
              )}
            </View>
          </>
        )}
        <View style={{ marginTop: 32 }}>
          <PrimaryButton
            disabled={!isOpen}
            label={
              isOpen
                ? `เพิ่มลงตะกร้า · ${formatBaht(item.price + extra)}`
                : "ร้านยังไม่เปิดรับออเดอร์"
            }
            onPress={submit}
          />
        </View>
      </ScrollView>
    </View>
  );
}
