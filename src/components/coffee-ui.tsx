import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
export const colors = {
  cream: "#FCF8F1",
  paper: "#FFFFFF",
  green: "#1F4D3A",
  paleGreen: "#E8EEE4",
  ink: "#243C32",
  muted: "#6D786F",
  line: "#E8E3D9",
  warm: "#F7EFE3",
};
export function PrimaryButton({
  label,
  onPress,
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: disabled ? "#AAB6AD" : colors.green,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16,
        alignItems: "center",
        opacity: pressed ? 0.82 : 1,
      })}
    >
      <Text style={{ color: "white", fontSize: 16, fontWeight: "800" }}>
        {label}
      </Text>
    </Pressable>
  );
}
export function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginTop: 28,
        marginBottom: 14,
      }}
    >
      <Text
        style={{
          fontSize: 23,
          lineHeight: 29,
          color: colors.ink,
          fontWeight: "800",
        }}
      >
        {title}
      </Text>
      {action}
    </View>
  );
}
export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 99,
        backgroundColor: selected ? colors.green : colors.paper,
        borderWidth: 1,
        borderColor: selected ? colors.green : colors.line,
        opacity: pressed ? 0.72 : 1,
      })}
    >
      <Text
        style={{ color: selected ? "white" : colors.ink, fontWeight: "700" }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
