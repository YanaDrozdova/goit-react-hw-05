import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDhlN2EwYzE5NDU2MDc5OGU4ODdkZTBkMGFmYTdkNSIsIm5iZiI6MTcyMDc4OTQxNi42Njk5Nywic3ViIjoiNjY5MDNjOTM1ZDY2M2E5OTU5ZDU1ZjYzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.kDRtCn_4pJWW6DvLr6dcULDtCVXxJWd_3Q0TKcs8C5M',
  },
};

export async function getTrendMovies() {
  const response = await axios.get('trending/movie/day', options);
  return response.data.results;
}

export async function getMoviesByTitle(title) {
  const response = await axios.get('search/movie', {
    ...options,
    params: {
      query: title,
    },
  });
  return response.data.results;
}

export async function getMovieById(movieId) {
  const response = await axios.get(`/movie/${movieId}`, options);
  return response.data;
}

export async function getMovieCastById(movieId) {
  const response = await axios.get(`movie/${movieId}/credits`, options);
  return response.data;
}

export async function getReviewsById(movieId) {
  const response = await axios.get(`movie/${movieId}/reviews`, options);
  return response.data;
}
