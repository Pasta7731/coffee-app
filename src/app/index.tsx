import { colors, SectionTitle } from "@/components/coffee-ui";
import { useCoffee } from "@/context/coffee-context";
import { formatBaht, menuItems } from "@/data/menu";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
export default function HomeScreen() {
  const { isOpen, count } = useCoffee();
  const popular = menuItems.filter((item) => item.isPopular);
  const newItems = menuItems.filter((item) => item.isNew);
  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: 24, paddingBottom: 110 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 33,
              lineHeight: 39,
              color: colors.green,
              fontWeight: "900",
              letterSpacing: -1.4,
            }}
          >
            ร้านละมุน.
          </Text>
          <Pressable onPress={() => router.push("/owner")}>
            <Text style={{ color: colors.muted, fontWeight: "700" }}>
              สำหรับร้านค้า
            </Text>
          </Pressable>
        </View>
        <Text
          style={{
            color: colors.muted,
            fontSize: 12,
            fontWeight: "800",
            letterSpacing: 1.1,
            marginTop: 5,
          }}
        >
          COFFEE & GOOD COMPANY
        </Text>
        <Text
          style={{
            color: colors.ink,
            fontSize: 36,
            lineHeight: 44,
            fontWeight: "400",
            letterSpacing: -1.4,
            marginTop: 30,
          }}
        >
          วันดี ๆ เริ่มที่นี่
        </Text>
        <Text style={{ color: colors.muted, fontSize: 17, marginTop: 7 }}>
          กาแฟข้างบ้าน สั่งล่วงหน้าได้ง่าย ๆ
        </Text>
        <Pressable
          onPress={() => router.push("/menu")}
          style={({ pressed }) => ({
            marginTop: 28,
            backgroundColor: isOpen ? colors.paleGreen : "#F2E5E0",
            padding: 18,
            borderRadius: 22,
            flexDirection: "row",
            gap: 14,
            alignItems: "center",
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text style={{ fontSize: 27 }}>{isOpen ? "◷" : "◌"}</Text>
          <View style={{ flex: 1 }}>
            <Text
              style={{ color: colors.green, fontWeight: "800", fontSize: 17 }}
            >
              {isOpen ? "เปิดรับออเดอร์ · ปิด 18:00" : "ปิดรับออเดอร์ชั่วคราว"}
            </Text>
            <Text style={{ color: colors.muted, marginTop: 4 }}>
              {isOpen
                ? "รับเครื่องดื่มได้ใน 10–15 นาที"
                : "เปิดรับอีกครั้งพรุ่งนี้ 08:00"}
            </Text>
          </View>
          <Text style={{ color: colors.green, fontSize: 28 }}>›</Text>
        </Pressable>
        <SectionTitle
          title="เมนูยอดนิยม"
          action={
            <Pressable onPress={() => router.push("/menu")}>
              <Text style={{ color: colors.green, fontWeight: "800" }}>
                ดูทั้งหมด
              </Text>
            </Pressable>
          }
        />
        <View style={{ flexDirection: "row", gap: 14 }}>
          {popular.map((item) => (
            <Pressable
              key={item.id}
              onPress={() =>
                router.push({ pathname: "/customize", params: { id: item.id } })
              }
              style={({ pressed }) => ({
                flex: 1,
                borderRadius: 22,
                backgroundColor: colors.paper,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: colors.line,
                opacity: pressed ? 0.75 : 1,
              })}
            >
              <View
                style={{
                  height: 128,
                  backgroundColor: item.color,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 55 }}>{item.emoji}</Text>
              </View>
              <View style={{ padding: 13, gap: 5 }}>
                <Text
                  numberOfLines={1}
                  style={{ color: colors.ink, fontSize: 16, fontWeight: "800" }}
                >
                  {item.thaiName}
                </Text>
                <Text style={{ color: colors.muted, fontSize: 13 }}>
                  {formatBaht(item.price)}
                </Text>
                <Text
                  style={{
                    color: colors.green,
                    fontSize: 20,
                    fontWeight: "600",
                    textAlign: "right",
                  }}
                >
                  ＋
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
        <SectionTitle title="มาใหม่วันนี้" />
        {newItems.map((item) => (
          <Pressable
            key={item.id}
            onPress={() =>
              router.push({ pathname: "/customize", params: { id: item.id } })
            }
            style={{
              backgroundColor: colors.paper,
              padding: 15,
              borderRadius: 18,
              borderWidth: 1,
              borderColor: colors.line,
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: item.color,
              }}
            >
              <Text style={{ fontSize: 26 }}>{item.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.ink, fontWeight: "800" }}>
                {item.thaiName}
              </Text>
              <Text
                numberOfLines={1}
                style={{ color: colors.muted, fontSize: 13, marginTop: 2 }}
              >
                {item.description}
              </Text>
            </View>
            <Text style={{ color: colors.ink, fontWeight: "800" }}>
              {formatBaht(item.price)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <Pressable
        onPress={() => router.push("/cart")}
        style={({ pressed }) => ({
          position: "absolute",
          right: 20,
          bottom: 25,
          backgroundColor: colors.green,
          borderRadius: 25,
          paddingVertical: 13,
          paddingHorizontal: 17,
          flexDirection: "row",
          gap: 8,
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <Text style={{ color: "white", fontWeight: "800" }}>ตะกร้า</Text>
        <View
          style={{
            backgroundColor: "white",
            width: 21,
            height: 21,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text
            style={{ color: colors.green, fontSize: 13, fontWeight: "900" }}
          >
            {count}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
