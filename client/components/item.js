import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, Button, StyleSheet } from "react-native";

export const Item = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imgUrl }} style={styles.image} />
      <View style={styles.button}>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.rating}>★ {item.rating}</Text>
        <Button
          title="See Detail"
          onPress={() => {
            navigation.navigate("Detail", {
              movieId: item.id,
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20,
    marginLeft: 7,
    fontFamily: "",
    fontWeight: 'bold'
  },
  rating: {
    color: "white",
    fontSize: 16,
    marginLeft: 7,
    marginTop: 5,
  },
  button: {
    alignItems: "flex-start",
  },
  card: {
    backgroundColor: "#222222",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    borderRadius: 6,
  },
  image: {
    width: 50,
    borderRadius: 2,
  },
});
