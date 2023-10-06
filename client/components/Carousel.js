import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";

const { width } = Dimensions.get("window");

export const Carousel = ({ data }) => {
  return (
    <FlatList
      contentContainerStyle={styles.carouselContainer}
      data={data}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={[styles.carouselItem]}>
          <ImageBackground
            source={item.image}
            style={styles.image}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  carouselItem: {
    width,
    height: 200,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

