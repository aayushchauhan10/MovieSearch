import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define Navigation Props
type RootStackParamList = {
  SearchResults: { query: string };
};

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = () => {
  const [query, setQuery] = useState("");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a movie..."
        value={query}
        onChangeText={setQuery}
      />
      {query.length > 0 && (
        <TouchableOpacity
          onPress={() => setQuery("")}
          style={styles.iconButton}
        >
          <Ionicons name="close-circle" size={24} color="gray" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("SearchResults", { query })}
      >
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginRight: 8,
    borderRadius: 5,
  },
  iconButton: {
    padding: 6,
    position: "absolute",
    right: 30,
  },
});

export default SearchBar;
