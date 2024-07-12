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

// fetch('https://api.themoviedb.org/3/authentication', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

export async function getMovies() {
  const response = await axios.get('trending/movie/day', options);
  return response.data;
}
