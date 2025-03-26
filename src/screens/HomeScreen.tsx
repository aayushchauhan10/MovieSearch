import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import { fetchTrendingMovies, searchMovies } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

type RootStackParamList = {
  Home: undefined;
  MovieDetails: { movieId: number; movieTitle: string };
  LikedMovies: { likedMovies: Movie[] };
};

type NavigationProps = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    fetchTrendingMovies().then((data) => setMovies(data));
  }, []);

  const handleLikeToggle = (movie: Movie) => {
    setLikedMovies((prevLikedMovies) =>
      prevLikedMovies.some((m) => m.id === movie.id)
        ? prevLikedMovies.filter((m) => m.id !== movie.id)
        : [...prevLikedMovies, movie]
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        onSearch={async (query) => {
          if (query.trim()) {
            const results = await searchMovies(query);
            setMovies(results);
          }
        }}
      />

      {/* Navigate to Liked Movies Screen */}
      <TouchableOpacity
        style={styles.likedMoviesButton}
        onPress={() => navigation.navigate("LikedMovies", { likedMovies })}
      >
        <Text style={styles.likedMoviesText}>❤️ View Liked Movies</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Trending Movies</Text>

      <MovieList
        movies={movies}
        onLike={handleLikeToggle}
        likedMovies={likedMovies}
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
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  heading: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  likedMoviesButton: {
    backgroundColor: "#ff4757",
    padding: 12,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  likedMoviesText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeScreen;
