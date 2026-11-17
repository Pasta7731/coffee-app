import { colors, PrimaryButton } from "@/components/coffee-ui";
import { useCoffee } from "@/context/coffee-context";
import { formatBaht } from "@/data/menu";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
export default function CartScreen() {
  const { cart, updateQuantity, total } = useCoffee();
  if (!cart.length)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.cream,
          justifyContent: "center",
          padding: 28,
          alignItems: "center",
          gap: 12,
        }}
      >
        <Text style={{ fontSize: 44 }}>🧺</Text>
        <Text style={{ color: colors.ink, fontSize: 22, fontWeight: "800" }}>
          ตะกร้ายังว่างอยู่
        </Text>
        <Text style={{ color: colors.muted, textAlign: "center" }}>
          เลือกกาแฟหรือขนมที่อยากรับวันนี้ได้เลย
        </Text>
        <View style={{ alignSelf: "stretch", marginTop: 16 }}>
          <PrimaryButton
            label="เลือกเมนู"
            onPress={() => router.replace("/menu")}
          />
        </View>
      </View>
    );
  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: 20, gap: 12 }}
      >
        {cart.map((entry) => (
          <View
            key={entry.id}
            style={{
              backgroundColor: colors.paper,
              borderRadius: 18,
              borderWidth: 1,
              borderColor: colors.line,
              padding: 15,
              flexDirection: "row",
              gap: 12,
            }}
          >
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 15,
                backgroundColor: entry.item.color,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 27 }}>{entry.item.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ color: colors.ink, fontSize: 16, fontWeight: "800" }}
              >
                {entry.item.thaiName}
              </Text>
              {entry.size && (
                <Text
                  style={{ color: colors.muted, fontSize: 13, marginTop: 4 }}
                >
                  {entry.size} · {entry.sweetness} · {entry.topping}
                </Text>
              )}
              <Text
                style={{ color: colors.green, fontWeight: "800", marginTop: 7 }}
              >
                {formatBaht(entry.item.price * entry.quantity)}
              </Text>
            </View>
            <View
              style={{ alignItems: "center", justifyContent: "center", gap: 7 }}
            >
              <Pressable onPress={() => updateQuantity(entry.id, 1)}>
                <Text
                  style={{
                    color: colors.green,
                    fontSize: 21,
                    fontWeight: "700",
                  }}
                >
                  ＋
                </Text>
              </Pressable>
              <Text style={{ color: colors.ink, fontWeight: "800" }}>
                {entry.quantity}
              </Text>
              <Pressable onPress={() => updateQuantity(entry.id, -1)}>
                <Text
                  style={{
                    color: colors.green,
                    fontSize: 21,
                    fontWeight: "700",
                  }}
                >
                  −
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderColor: colors.line,
          backgroundColor: colors.paper,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <Text style={{ color: colors.muted }}>รวมทั้งหมด</Text>
          <Text style={{ color: colors.ink, fontSize: 21, fontWeight: "900" }}>
            {formatBaht(total)}
          </Text>
        </View>
        <PrimaryButton
          label="ไปยืนยันคำสั่งซื้อ"
          onPress={() => router.push("/checkout")}
        />
      </View>
    </View>
  );
}
