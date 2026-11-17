import { colors, PrimaryButton, SectionTitle } from "@/components/coffee-ui";
import { useCoffee } from "@/context/coffee-context";
import { formatBaht } from "@/data/menu";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
export default function CheckoutScreen() {
  const { cart, total } = useCoffee();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const order = () =>
    router.replace({
      pathname: "/confirmation",
      params: { name, phone, note },
    });
  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 20, paddingBottom: 36 }}
      >
        <View
          style={{
            padding: 17,
            borderRadius: 18,
            backgroundColor: colors.paleGreen,
          }}
        >
          <Text style={{ color: colors.green, fontWeight: "800" }}>
            ชำระเงินที่ร้าน
          </Text>
          <Text style={{ color: colors.muted, marginTop: 5, lineHeight: 20 }}>
            ออเดอร์จะเริ่มทำเมื่อร้านกดรับแล้ว กรุณามารับภายในเวลาที่แจ้ง
          </Text>
        </View>
        <SectionTitle title="ข้อมูลผู้รับ" />
        <Text style={{ color: colors.muted, marginBottom: 7 }}>
          ชื่อสำหรับเรียกเมื่อรับเครื่องดื่ม
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="เช่น มายด์"
          placeholderTextColor="#9AA39C"
          style={{
            backgroundColor: colors.paper,
            borderWidth: 1,
            borderColor: colors.line,
            borderRadius: 14,
            padding: 15,
            fontSize: 16,
            color: colors.ink,
          }}
        />
        <Text style={{ color: colors.muted, marginBottom: 7, marginTop: 16 }}>
          เบอร์ติดต่อ
        </Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="08x-xxx-xxxx"
          keyboardType="phone-pad"
          placeholderTextColor="#9AA39C"
          style={{
            backgroundColor: colors.paper,
            borderWidth: 1,
            borderColor: colors.line,
            borderRadius: 14,
            padding: 15,
            fontSize: 16,
            color: colors.ink,
          }}
        />
        <Text style={{ color: colors.muted, marginBottom: 7, marginTop: 16 }}>
          หมายเหตุเพิ่มเติม (ถ้ามี)
        </Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="เช่น ไม่ใส่นมข้นหวาน"
          placeholderTextColor="#9AA39C"
          style={{
            backgroundColor: colors.paper,
            borderWidth: 1,
            borderColor: colors.line,
            borderRadius: 14,
            padding: 15,
            fontSize: 16,
            color: colors.ink,
          }}
        />
        <SectionTitle title="สรุปคำสั่งซื้อ" />
        {cart.map((entry) => (
          <View
            key={entry.id}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={{ color: colors.ink }}>
              {entry.quantity}× {entry.item.thaiName}
            </Text>
            <Text style={{ color: colors.ink, fontWeight: "700" }}>
              {formatBaht(entry.item.price * entry.quantity)}
            </Text>
          </View>
        ))}
        <View
          style={{
            borderTopWidth: 1,
            borderColor: colors.line,
            marginTop: 7,
            paddingTop: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: colors.ink, fontSize: 18, fontWeight: "800" }}>
            ยอดรวม
          </Text>
          <Text
            style={{ color: colors.green, fontSize: 21, fontWeight: "900" }}
          >
            {formatBaht(total)}
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <PrimaryButton
            disabled={!name.trim() || !phone.trim()}
            label="ยืนยันและส่งออเดอร์"
            onPress={order}
          />
        </View>
      </ScrollView>
    </View>
  );
}
