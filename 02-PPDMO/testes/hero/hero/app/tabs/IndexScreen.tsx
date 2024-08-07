import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TextInput } from 'react-native';

const IndexScreen: React.FC = () => {
  const [games, setGames] = useState<any[]>([]);
  const [filteredGames, setFilteredGames] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('https://api.rawg.io/api/games?key=094f91a83fc34e9daa8cf3324dda9c3b');
        const data = await response.json();
        setGames(data.results);
        setFilteredGames(data.results);
      } catch (error) {
        setError('Failed to fetch games.');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredGames(games);
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = games.filter(game =>
        game.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredGames(filtered);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Games List</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for games..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredGames}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image 
              source={{ uri: item.background_image || 'https://via.placeholder.com/100x150' }} 
              style={styles.image} 
              resizeMode="cover" 
            />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#fff',
  },
  row: {
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#1e1e1e',
    padding: 5,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  name: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default IndexScreen;