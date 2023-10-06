import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import Navbar from "../components/Navbar";
import { Carousel } from "../components/Carousel";
import backgroundOne from "../assets/background-movie.png";
import backgroundTwo from "../assets/background-movie-2.png";
import { useQuery } from "@apollo/client";
import { GET_MOVIES_ID } from "../queries";

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

export default function Detail({ route }) {
  const { movieId } = route.params;

  const {loading, data, error} = useQuery(GET_MOVIES_ID, {
    variables: {
      movieByIdId: movieId
    }
  })

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  console.log(loading, data, error);

  const movie = data.movieById

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Navbar />

        <View style={styles.banner}>
          <Carousel data={dataImage} />
        </View>

        <ScrollView>
          <View style={styles.detailsContainer}>
            <Image source={{ uri: movie.imgUrl }} style={styles.poster} />
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.genre}>Genre : {movie.Genre.name}</Text>
            <Text style={styles.rating}>★ : {movie.rating}</Text>
            <Text style={styles.plot}>{movie.synopsis}</Text>
            <Text style={styles.author}>Created by {movie.Author.username}</Text>
          </View>
        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flex: 1,
    backgroundColor: "#222222",
  },
  banner: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#black",
  },
  body: {
    flex: 4,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    marginBottom: 5,
  },
  poster: {
    width: "50%",
    height: "50%",
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  author: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
    color: "white",
  },
  genre: {
    fontSize: 18,
    marginBottom: 8,
    color: "white",
  },
  rating: {
    fontSize: 18,
    marginBottom: 8,
    color: "white",
  },
  plot: {
    fontSize: 16,
    color: "white",
  },
});
