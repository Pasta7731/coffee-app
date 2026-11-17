import { colors, PrimaryButton } from "@/components/coffee-ui";
import { useCoffee } from "@/context/coffee-context";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
export default function ConfirmationScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { clearCart } = useCoffee();
  const done = () => {
    clearCart();
    router.replace("/");
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.cream,
        alignItems: "center",
        justifyContent: "center",
        padding: 28,
      }}
    >
      <View
        style={{
          width: 92,
          height: 92,
          borderRadius: 46,
          backgroundColor: colors.paleGreen,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: colors.green, fontSize: 42 }}>✓</Text>
      </View>
      <Text
        style={{
          color: colors.ink,
          fontSize: 27,
          fontWeight: "900",
          marginTop: 25,
        }}
      >
        ส่งออเดอร์แล้ว!
      </Text>
      <Text
        style={{
          color: colors.muted,
          fontSize: 16,
          textAlign: "center",
          lineHeight: 23,
          marginTop: 10,
        }}
      >
        ขอบคุณ {name || "คุณ"}
        {`\n`}ร้านจะเริ่มทำหลังจากกดรับออเดอร์
      </Text>
      <View
        style={{
          width: "100%",
          borderRadius: 20,
          backgroundColor: colors.paper,
          borderWidth: 1,
          borderColor: colors.line,
          padding: 20,
          marginTop: 30,
          gap: 8,
        }}
      >
        <Text style={{ color: colors.muted, textAlign: "center" }}>
          เลขที่ออเดอร์
        </Text>
        <Text
          selectable
          style={{
            color: colors.green,
            textAlign: "center",
            fontSize: 29,
            fontWeight: "900",
            fontVariant: ["tabular-nums"],
          }}
        >
          G-042
        </Text>
        <Text style={{ color: colors.ink, textAlign: "center", marginTop: 8 }}>
          คาดว่ารับได้ใน 10–15 นาที
        </Text>
        <Text
          style={{ color: colors.muted, textAlign: "center", fontSize: 13 }}
        >
          ชำระเงินที่เคาน์เตอร์เมื่อรับสินค้า
        </Text>
      </View>
      <View style={{ alignSelf: "stretch", marginTop: 32 }}>
        <PrimaryButton label="กลับหน้าแรก" onPress={done} />
      </View>
    </View>
  );
}
