
import React, {Component } from 'react';
import SearchPresenter from './SearchPresenter.js'
import {movieAPI, tvAPI} from '../../api/index.js'
class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieResults : null,
      tvResults : null,
      searchTitle: '', 
      error: null,
      isLoading: false
       
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const { searchTitle } = this.state;
      console.log(searchTitle);
      
      if(searchTitle!==""){
        this.setState({
          isLoading: true
        })
        const {data: {results: movieResults}} = await movieAPI.searchMovie(searchTitle);
        const {data: {results: tvResults}} = await tvAPI.searchTV(searchTitle); 
        this.setState({
          movieResults,
          tvResults
        })
      }else{
        return;
      }
    }catch(error){
      this.setState({
        error: "오류 발생"
      })
    }finally{
      this.setState({
        isLoading: false
      })
    }
    
  }
  handleChange = (e)=>{
    console.log(e.target.value);
    this.setState({
      searchTitle : e.target.value
    })
  }
  // componentDidMount(){
  //   this.onSubmit();
  // }
  render() {
    const {movieResults,tvResults,searchTitle, error, isLoading} = this.state;
    console.log(this.state);
    
    return (
      <SearchPresenter 
        movieResults={movieResults} 
        tvResults={tvResults}
        searchTitle={searchTitle}
        error={error} 
        isLoading={isLoading}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        ></SearchPresenter>
    )
  }
}

export default SearchContainer;