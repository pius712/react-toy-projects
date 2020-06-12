import React, { Component } from 'react';
import axios from 'axios';
import Movie from './Movie'
import './css/App.css'
class App extends Component {

  state = {
    isLoading: true,
    movies: []
  }
  async fetchData() {
    const {data: { data: {movies} }} = await axios.get('https://yts.mx/api/v2/list_movies.json')
    console.log(movies);
    this.setState({isLoading: false,
    movies})
  };
  componentDidMount(){
    this.fetchData();
  }
  render() {
    const {movies} = this.state;
    return (
      <div className="App">
        <p>{this.state.isLoading? "wait until loading" : "loaded"}</p>
        <div className="container">{movies.map(movie=>(
          <Movie key={movie.id} data={movie}></Movie>
        ))}</div>
      </div>
    );
    }
}

export default App;
