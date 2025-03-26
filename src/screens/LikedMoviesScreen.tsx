import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MovieList from "../components/MovieList";
import { RouteProp } from "@react-navigation/native";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

type RootStackParamList = {
  LikedMovies: { likedMovies: Movie[] };
};

type LikedMoviesScreenRouteProp = RouteProp<RootStackParamList, "LikedMovies">;

interface Props {
  route: LikedMoviesScreenRouteProp;
}

const LikedMoviesScreen: React.FC<Props> = ({ route }) => {
  const { likedMovies } = route.params;

  return (
    <View style={styles.container}>
      {likedMovies.length > 0 ? (
        <MovieList
          movies={likedMovies}
          onLike={() => {}}
          likedMovies={likedMovies}
          onPress={() => {}}
          showLikeButton={false}
        />
      ) : (
        <Text style={styles.noMoviesText}>No liked movies yet!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  noMoviesText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default LikedMoviesScreen;
