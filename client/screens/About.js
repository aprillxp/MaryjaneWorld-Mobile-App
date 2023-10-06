import { View, Text, StyleSheet } from "react-native";

export default function About({}) {
  return (
    <View
      style={{
        flex: 4,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 10,
      }}
    >
      <Text style={{ color: "white" }}>
        Welcome to Maryjane World, the ultimate online movie destination that
        caters to all your cinematic cravings. Immerse yourself in the world of
        film like never before, where every visit promises an unforgettable
        movie experience.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
