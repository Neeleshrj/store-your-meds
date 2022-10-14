import { View, StyleSheet } from "react-native";

export default function InputContainer({ styling, children }) {
  return <View style={[styles.container, styling]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
});
