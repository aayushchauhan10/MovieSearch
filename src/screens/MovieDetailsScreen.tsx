import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { getMovieDetails } from "../services/api";

type MovieDetailsRouteProp = RouteProp<
  { MovieDetails: { movieId: number } },
  "MovieDetails"
>;

const MovieDetailsScreen: React.FC = () => {
  const route = useRoute<MovieDetailsRouteProp>();
  const { movieId } = route.params;
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovieDetails(movieId).then((data) => {
      setMovie(data);
      setLoading(false);
    });
  }, [movieId]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Backdrop Image */}
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`,
        }}
        style={styles.backdrop}
        blurRadius={10}
      >
        <View style={styles.overlay} />
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={styles.poster}
        />
      </ImageBackground>

      {/* Movie Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.tagline}>"{movie.tagline}"</Text>

        {/* Genres */}
        <View style={styles.genreContainer}>
          {movie.genres.map((genre: any) => (
            <Text key={genre.id} style={styles.genre}>
              {genre.name}
            </Text>
          ))}
        </View>

        {/* Release Date & Runtime */}
        <Text style={styles.info}>
          📅 Release Date: {movie.release_date} | ⏳ {movie.runtime} min
        </Text>

        {/* Ratings */}
        <Text style={styles.rating}>
          ⭐ {movie.vote_average} ({movie.vote_count} votes)
        </Text>

        {/* Overview */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overview}>{movie.overview}</Text>

        {/* Production Companies */}
        <Text style={styles.sectionTitle}>Production</Text>
        {movie.production_companies.map((company: any) => (
          <Text key={company.id} style={styles.production}>
            🎬 {company.name} ({company.origin_country})
          </Text>
        ))}

        {/* Website */}
        {movie.homepage && (
          <Text style={styles.link}>🔗 Official Site: {movie.homepage}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  loader: { flex: 1, justifyContent: "center" },
  backdrop: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 10,
    marginTop: 50,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  tagline: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#bbb",
    textAlign: "center",
    marginBottom: 10,
  },
  genreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginVertical: 8,
  },
  genre: {
    backgroundColor: "#ff4757",
    color: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: 5,
    fontSize: 14,
  },
  info: { fontSize: 14, color: "#aaa", textAlign: "center", marginBottom: 5 },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffd700",
    textAlign: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 15,
    marginBottom: 5,
  },
  overview: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "justify",
    lineHeight: 22,
  },
  production: { fontSize: 14, color: "#ddd", marginBottom: 3 },
  link: {
    fontSize: 14,
    color: "#1e90ff",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});

export default MovieDetailsScreen;
