import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, FlatList, Text, TextInput } from "react-native";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import { fetchTrendingMovies, searchMovies } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define Movie type
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

// Define navigation type
type RootStackParamList = {
  Home: undefined;
  MovieDetails: { movieId: number; movieTitle: string };
};

type NavigationProps = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const navigation = useNavigation<NavigationProps>();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    fetchTrendingMovies().then((data) => setMovies(data));
  }, []);

  const handleSearch = async (query: string) => {
    if (query.trim() === "") {
      inputRef.current?.focus();
    } else {
      const results = await searchMovies(query);
      setSearchResults(results);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <Text
        style={{
          marginTop: 20,
          marginHorizontal: 10,
          marginBottom: 10,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Trending Movies
      </Text>
      <MovieList
        onLike={(movie) => console.log("Liked movie:", movie)}
        movies={movies}
        onPress={(movie: Movie) =>
          navigation.navigate("MovieDetails", {
            movieId: movie.id,
            movieTitle: movie.title,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  heading: {
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeScreen;
