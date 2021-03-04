import React, { Component } from 'react';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';
import './Calculator.css';

class Calculator extends Component {
    state = {
        displayValue: '0',
        numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0', 'ce'],
        operators: ['/', 'x', '-', '+'],
        selectedOperator: '',
        storedValue: '',
    }
      callOperator = () => {
        console.log('call operation');
      }
    
      setOperator = () => {
        console.log('set operation');
      }
    
      updateDisplay = value => {
        let { displayValue } = this.state;

        if (value === 'ce') {
            // removes the last character in displayValue
            displayValue = displayValue.substr(0, displayValue.length -1);
            // if removing the last character results in empty string
            // set display value to '0'
            if(displayValue === '') displayValue = '0';
        } else {
            displayValue === '0' ? displayValue = value : displayValue += value;
            // if the displayValue is 0 we simply replace the value here
            // as it's a string adding the values together concatenates them 
        }
        this.setState({ displayValue });
      }

    render = () => {
        const { displayValue, numbers, operators } = this.state;
        return (
           <div className="calculator-container">
               <Display displayValue={displayValue} />
               <Keypad
                    callOperator={this.callOperator}
                    numbers={numbers}
                    operators={operators}
                    setOperator={this.setOperator}
                    updateDisplay={this.updateDisplay}
                />
           </div>
        );
    };
}

export default Calculator;