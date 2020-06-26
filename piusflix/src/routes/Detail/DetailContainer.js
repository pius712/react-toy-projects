
import React, {Component } from 'react';
import DetailPresenter from './DetailPresenter'
import {movieAPI, tvAPI} from '../../api/index.js'
class DetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: null,
      isLoading: true
    }
  }
  isNumber(n) { 
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
  }
  isMovie(pathname){
    return pathname.includes('/movie/');
  }
  isTV(pathname){
    return pathname.includes('/tv/');
  }
  async componentDidMount(){
    const {id} = this.props.match.params;
    const {pathname} = this.props.location;
    // console.log(pathname)
    // console.log(id);
    console.log("?");
    
    if(!this.isNumber(id)){
      return this.props.history.push('/');
      // console.log('pushed')
    }
    try{
      let result;
      if(this.isMovie(pathname)){
        result = await movieAPI.fetchDetail(id);
        
      }else if(this.isTV(pathname)){
        result = await tvAPI.fetchDetail(id);
        console.log(result);
      }else{
        console.log("else");
      }
      this.setState({
        result: result.data
      })
      console.log("state", this.state);
    }catch(error){
      this.setState({
        error: "TT"
      })
    }finally{
      this.setState({
        isLoading: false,
      })
    }
    
    
  }
  render(){
    const {result, error, isLoading } = this.state;
    
    return (
      <DetailPresenter result={result} error={error} isLoading={isLoading}></DetailPresenter>
    )
  }
}

export default DetailContainer;