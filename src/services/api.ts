import axios from 'axios';


// Fetch trending movies for homepage
export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, {
        headers: {
            "Accept": 'application/json',
            "Authorization": `Bearer ${process.env.EXPO_PUBLIC_READER_TOKEN}`
        }
    });
    const data = await response.data;
    return data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};


// Fetch movies based on search query
export const searchMovies = async (query: string) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, {
      headers: {
        "Accept": 'application/json',
        "Authorization": `Bearer ${process.env.EXPO_PUBLIC_READER_TOKEN}`
      }
    })
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

// Fetch details of a single movie
export const getMovieDetails = async (movieId: number) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: {
          "Accept": 'application/json',
          "Authorization": `Bearer ${process.env.EXPO_PUBLIC_READER_TOKEN}`
        }})
    return response.data;

  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};
