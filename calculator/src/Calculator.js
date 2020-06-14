import React, {Component} from 'react';
import TempInput from './TempInput';


function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
class Calculator extends Component {

  constructor(props){
    super(props);
    this.state = { temperature: '', scaleName: 'c'};
    
    this.onTempChange = this.onTempChange.bind(this);
    this.handleC = this.handleC.bind(this);
    this.handleF = this.handleF.bind(this);
  };
  onTempChange(value){
    this.setState({temperature: value});
  }
  handleC(value){
    this.setState({temperature:value, scaleName:'c'})
  }
  handleF(value){
    this.setState({temperature:value, scaleName:'f'})
  }
  render(){
    const scaleName = this.state.scaleName;
    const temperature = this.state.temperature; 
    const celsius = scaleName==='f'? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scaleName==='c'? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TempInput 
        scaleName='c'
        temperature={celsius}
        onTempChange={this.handleC}></TempInput>
        <TempInput 
        scaleName='f'
        temperature={fahrenheit}
        onTempChange={this.handleF}></TempInput>
      </div>
    )
  }
} 
export default Calculator;