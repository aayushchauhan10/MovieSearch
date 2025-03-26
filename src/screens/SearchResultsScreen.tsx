import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { searchMovies } from "../services/api";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  SearchResults: { query: string };
  MovieDetails: { movieId: number; movieTitle: string };
};

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

type NavigationProps = StackNavigationProp<RootStackParamList, "SearchResults">;

const SearchResultsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "SearchResults">>();
  const navigation = useNavigation<NavigationProps>();
  const { query } = route.params;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [likedMovies, setLikedMovies] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      searchMovies(query).then((data) => {
        setMovies(data);
        setLoading(false);
      });
    }, 3000);
  }, [query]);

  // Handle Like/Unlike
  const handleLike = (movie: Movie) => {
    setLikedMovies((prevLikedMovies) =>
      prevLikedMovies.includes(movie.id)
        ? prevLikedMovies.filter((id) => id !== movie.id)
        : [...prevLikedMovies, movie.id]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Results for "{query}"</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#6200ea" style={styles.loader} />
      ) : (
        <MovieList
          movies={movies}
          onPress={(movie: Movie) =>
            navigation.navigate("MovieDetails", {
              movieId: movie.id,
              movieTitle: movie.title,
            })
          }
          showLikeButton={false}
          onLike={handleLike}
          likedMovies={likedMovies}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
  loader: {
    marginTop: 20,
    alignSelf: "center",
  },
});

export default SearchResultsScreen;
