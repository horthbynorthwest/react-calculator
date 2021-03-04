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
        let { displayValue, selectedOperator, storedValue } = this.state;

        // turn strings into numbers to perform operations
        displayValue = parseInt(displayValue, 10);
        storedValue = parseInt(storedValue, 10);

        switch(selectedOperator) {
            case '+':
                displayValue = storedValue + displayValue;
                break;
            case '-':
                displayValue = storedValue - displayValue;
                break;
            case 'x':
                displayValue = storedValue * displayValue;
                break;
            case '/':
                displayValue = storedValue / displayValue;
                break;
            default:
                // set display to 0 if no case matches
                displayValue = '0';
        }
        

        displayValue = displayValue.toString();

        if(displayValue === 'NaN' || displayValue === 'Infinity') displayValue = '0';

        this.setState({ displayValue, selectedOperator, storedValue });
      }
    
      setOperator = value => {
        let { displayValue, selectedOperator, storedValue } = this.state;

        // check if a value is already present for selectedOperator
        if(selectedOperator === '') {
            // set the storedValue to the displayValue
            storedValue = displayValue;

            // reset the value of displayValue for the 2nd number to be operated upon
            displayValue = '0';

            // update the value of selectedOperator
            selectedOperator = value;
        } else {
            // if selectedOperator is not an empty string
            // update the value to the given value
            selectedOperator = value;
        }


        this.setState({ displayValue, selectedOperator, storedValue });
      }
    
      updateDisplay = value => {
        let { displayValue } = this.state;

        // if '.' has already been clicked then we wipe the string
        if (value === '.' && displayValue.includes('.')) value = '';

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