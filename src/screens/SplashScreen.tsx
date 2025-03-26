import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
};
type NavigationProps = StackNavigationProp<RootStackParamList, "Splash">;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Home");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/splash.json")}
        autoPlay
        loop={false}
        onAnimationFinish={() => navigation.replace("Home")}
        style={styles.animation}
        resizeMode="cover"
      />
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  animation: {
    width,
    height,
  },
});

export default SplashScreen;
