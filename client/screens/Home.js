import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Item } from "../components/item";
import { Carousel } from "../components/Carousel";
import backgroundOne from "../assets/background-movie.png";
import backgroundTwo from "../assets/background-movie-2.png";
import Navbar from "../components/Navbar";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../queries";

const dataImage = [
  {
    id: 1,
    image: backgroundOne,
  },
  {
    id: 2,
    image: backgroundTwo,
  },
];

export default function Home({ navigation }) {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const movies = data.movies;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <Navbar />
        <View
          style={{ flex: 2, flexDirection: "row", backgroundColor: "#333333" }}
        >
          <Carousel data={dataImage} />
        </View>

        <View style={{ flex: 4, backgroundColor: "black" }}>
          <FlatList
            data={movies}
            renderItem={({ item }) => {
              return <Item item={item} navigation={navigation} />;
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
