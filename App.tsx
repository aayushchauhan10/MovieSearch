import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import MovieDetailsScreen from "./src/screens/MovieDetailsScreen";
import SplashScreen from "./src/screens/SplashScreen";
import SearchResultsScreen from "./src/screens/SearchResultsScreen";
import LikedMoviesScreen from "./src/screens/LikedMoviesScreen"; // Import LikedMoviesScreen
import { StatusBar } from "react-native";
import { Movie } from "./src/types";

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  MovieDetails: { movieId: number; movieTitle: string };
  SearchResults: { query: string };
  LikedMovies: { likedMovies: Movie[] };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            options={{ headerShown: false }}
            component={SplashScreen}
          />
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="MovieDetails"
            component={MovieDetailsScreen}
            options={({ route }) => ({ title: route.params.movieTitle })}
          />
          <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
          <Stack.Screen
            name="LikedMovies"
            component={LikedMoviesScreen} // Add LikedMoviesScreen here
            options={{ title: "Liked Movies" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
