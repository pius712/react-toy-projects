import React, { Component } from 'react';

const scaleName = {
  c : 'Celcius',
  f: 'Fahrenheit'
}

class TempInput extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onTempChange(e.target.value);
  }
  render(){
    const scaleName = this.props.scaleName;
    const temperature = this.props.temperature;
    return (
      <div>
        <fieldset>
          <legend>{scaleName}</legend>
          <input value={temperature} onChange={this.handleChange}></input>
        </fieldset>
      </div>
    )
  }
}
export default TempInput;