import { View, StyleSheet, Text } from "react-native";

export default function Navbar() {
  return (
    <View style={styles.navHeader}>
      <Text style={styles.navTitle}>Movie List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navHeader: {
    flex: 1,
    backgroundColor: "#222222",
    alignItems: "flex-start",
    justifyContent: "center",
  },

  navTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffdf00",
    marginLeft: 10,
  },
});
