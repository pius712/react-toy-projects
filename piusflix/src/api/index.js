import axios from 'axios';

const params = {
  params: {
    api_key : '73f234c1a8825748ba22bd1e0935fc92',
    language:'en-US',
    page:'1'
  }
}
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  // params: {
  //   api_key : '73f234c1a8825748ba22bd1e0935fc92',
  //   language:'en-US',
  //   page:'1'
  // }
});

const movieAPI = {
  //popular
  fetchPopular: () => instance.get('movie/popular', params),
  // top_rated
  fetchTopRated: () => instance.get('movie/top_rated', params),
  // detail
  fetchDetail : (id) => {
    const searchParams = {
      append_to_response : 'videos',
      ...params.params
    }
    return instance.get(`movie/${id}`, {
      params : searchParams 
    })
  },
  searchMovie : (title) => {
    const searchParams = {
      query:encodeURIComponent(title),
      ...params.params
    };
    console.log(searchParams);
    return instance.get('search/movie',{
      params: searchParams
    });
  }
}

const tvAPI = {
  // on air 
  fetchOnAir: () => instance.get('tv/on_the_air', params),
  // popular
  fetchPopular: () => instance.get('tv/popular', params),
  //detail
  fetchDetail : (id) => {
    const searchParams = {
      append_to_response : 'videos',
      ...params.params
    }
    return instance.get(`tv/${id}`,{
      
      params : searchParams
    })
  },
  
  searchTV : (title) => {
    const searchParams = {
      query:encodeURIComponent(title),
      ...params.params
    };
    console.log(searchParams);
    
    return instance.get('search/tv', {
      params: searchParams});
  }
};
// const fetchTvPopular = () => {
//   instance.get("tv/popular")
// }
export {movieAPI, tvAPI};

