import React, {Component} from 'react'
import './css/Movie.css'
class Movie extends Component {
  render(){
    // console.log(this.props);
    const { data } = this.props;
    // console.log("movies", movie);
    return (
      <div className="movie">
        <div>
          <img src={data.medium_cover_image} alt={data.title}></img>
        </div>
        <div className="movie_data">
          <div className="movie_title">{data.title}</div>
          <li className="movie_genre">{data.genres.map((genre,idx)=>(
            <ul key={idx}>{genre}</ul>
          ))}</li>
          <div className="movie_summary">{data.summary}</div>
        </div>
      </div>
    )
  }
}

export default Movie;