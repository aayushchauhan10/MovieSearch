import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import MovieDetailsScreen from "./src/screens/MovieDetailsScreen";
import SplashScreen from "./src/screens/SplashScreen";
import SearchResultsScreen from "./src/screens/SearchResultsScreen";
import { StatusBar } from "react-native";

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  MovieDetails: { movieId: number; movieTitle: string };
  SearchResults: { query: string };
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
