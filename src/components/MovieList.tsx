import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface MovieListProps {
  movies: Movie[];
  onLike?: (movie: Movie) => void;
  onPress: (movie: Movie) => void;
  showLikeButton?: boolean;
  likedMovies?: Movie[] | number[];
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  onLike,
  onPress,
  showLikeButton = true,
}) => {
  const [likedMovies, setLikedMovies] = useState<number[]>([]);

  const handleLikeToggle = (movie: Movie) => {
    if (!onLike) return;

    setLikedMovies((prev) =>
      prev.includes(movie.id)
        ? prev.filter((id) => id !== movie.id)
        : [...prev, movie.id]
    );
    onLike(movie);
  };

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => onPress(item)}
          activeOpacity={0.8}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            style={styles.poster}
          />
          <View style={styles.details}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>
              {item.overview.substring(0, 50)}...
            </Text>
            {showLikeButton && (
              <TouchableOpacity
                style={styles.likeButton}
                onPress={() => handleLikeToggle(item)}
                activeOpacity={0.7}
              >
                <Text
                  style={
                    likedMovies.includes(item.id)
                      ? styles.liked
                      : styles.unliked
                  }
                >
                  {likedMovies.includes(item.id) ? "❤️ Liked" : "🤍 Like"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  details: {
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  description: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    marginVertical: 5,
  },
  likeButton: {
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  liked: {
    color: "red",
    fontWeight: "bold",
    fontSize: 14,
  },
  unliked: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default MovieList;
