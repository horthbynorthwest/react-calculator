import React from 'react';
import { mount, render, shallow } from 'enzyme';
import Calculator from './Calculator';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad'
import '../setupTests'

describe('Calculator', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<Calculator />));

    it('should render a <div />', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render the Display and Keypad Components', () => {
        expect(wrapper.containsAllMatchingElements([
        <Display displayValue={wrapper.instance().state.displayValue} />,
        <Keypad 
            callOperator={wrapper.instance().callOperator}
            numbers={wrapper.instance().state.numbers}
            operators={wrapper.instance().state.operators}
            setOperator={wrapper.instance().setOperator}
            updateDisplay={wrapper.instance().updateDisplay}
        />]
        )).toEqual(true)
    });
});

describe('Mounted Calculator', () => {
    let wrapper;

    beforeEach(() => wrapper = mount(<Calculator />));

    it('calls updateDisplay when a number key is clicked', () => {
        // created a spy/double of the updateDisplay function
        const spy = jest.spyOn(wrapper.instance(), 'updateDisplay');
        // use forceUpdate to re-render the instance within this test
        wrapper.instance().forceUpdate();
        // won't have been called as it's an on click method
        expect(spy).toHaveBeenCalledTimes(0);
        // use simulate to simulate a person clicking a key
        wrapper.find('.number-key').first().simulate('click');
        // now has been called as it's an on click method
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('calls setOperator when an operator key is clicked', () => {
        // created a spy/double of the updateDisplay function
        const spy = jest.spyOn(wrapper.instance(), 'setOperator');
        // use forceUpdate to re-render the instance within this test
        wrapper.instance().forceUpdate();
        // won't have been called as it's an on click method
        expect(spy).toHaveBeenCalledTimes(0);
        // use simulate to simulate a person clicking a key
        wrapper.find('.operator-key').first().simulate('click');
        // now has been called as it's an on click method
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('calls callOperator when the submit key is clicked', () => {
        // created a spy/double of the updateDisplay function
        const spy = jest.spyOn(wrapper.instance(), 'callOperator');
        // use forceUpdate to re-render the instance within this test
        wrapper.instance().forceUpdate();
        // won't have been called as it's an on click method
        expect(spy).toHaveBeenCalledTimes(0);
        // use simulate to simulate a person clicking a key
        wrapper.find('.submit-key').first().simulate('click');
        // now has been called as it's an on click method
        expect(spy).toHaveBeenCalledTimes(1);
    });
});

describe('updateDisplay', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<Calculator />));

    it('updates displayValue to 5', () => {
        // Here we're saying that updateDisplay takes a string argument
        // we're using wrapper.instance of the Calculator component as updating the display 
        // will cause the Display component to re-render & update the state
        // We are then testing the Calculator state to make sure it's been updated correctly
        wrapper.instance().updateDisplay('5');
        expect(wrapper.state('displayValue')).toEqual('5')
    });

    it('concatenates displayValue', () => {
        wrapper.instance().updateDisplay('5');
        wrapper.instance().updateDisplay('0');
        expect(wrapper.state('displayValue')).toEqual('50')
    });

    it('removes leading "0" from displayValue', () => {
        wrapper.instance().updateDisplay('0');
        expect(wrapper.state('displayValue')).toEqual('0');
        wrapper.instance().updateDisplay('5');
        expect(wrapper.state('displayValue')).toEqual('5');
    });

    it('prevents multiple leading "0"s from displayValue', () => {
        wrapper.instance().updateDisplay('0');
        wrapper.instance().updateDisplay('0');
        expect(wrapper.state('displayValue')).toEqual('0');
    });

    it('removes last char of displayValue', () => {
        wrapper.instance().updateDisplay('5');
        wrapper.instance().updateDisplay('0');
        wrapper.instance().updateDisplay('ce');
        expect(wrapper.state('displayValue')).toEqual('5');
    });

    it('will set displayValue to "0" if displayValue is equal to an empty string', () => {
        wrapper.instance().updateDisplay('ce');
        expect(wrapper.state('displayValue')).toEqual('0');
    });

    it('prevents multiple instances of "." in displayValue', () => {
        wrapper.instance().updateDisplay('.');
        wrapper.instance().updateDisplay('.');
        expect(wrapper.state('displayValue')).toEqual('.');
    });
});

describe('setOperator', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<Calculator />));

    it('updates the value of selectedOperator', () => {
        wrapper.instance().setOperator('+');
        expect(wrapper.state('selectedOperator')).toEqual('+');
    });
    it('updates the value of selectedOperator if a different operator is clicked', () => {
        wrapper.instance().setOperator('+');
        expect(wrapper.state('selectedOperator')).toEqual('+');
        wrapper.instance().setOperator('/');
        expect(wrapper.state('selectedOperator')).toEqual('/');
    });

    it('updates the value of storedValue to the value of displayValue', () => {
        wrapper.setState({ displayValue: '5' });
        wrapper.instance().setOperator('+');
        expect(wrapper.state('storedValue')).toEqual('5');
    });

    it('updates the value of displayValue to "0" after pressing an operator for the 2nd number', () => {
        wrapper.setState({ displayValue: '5' });
        wrapper.instance().setOperator('+');
        expect(wrapper.state('displayValue')).toEqual('0');
    });

    it('updating selectedOperator does not update storedValue', () => {
        wrapper.setState({ displayValue: '5' });
        wrapper.instance().setOperator('+');
        expect(wrapper.state('storedValue')).toEqual('5');
        wrapper.instance().setOperator('-');
        expect(wrapper.state('storedValue')).toEqual('5');
    });
});

describe('callOperator', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<Calculator />));

    it('updates displayValue to the sum of the storedValue and displayValue', () => {
        wrapper.setState({ storedValue: '3' });
        wrapper.setState({ displayValue: '2' });
        wrapper.setState({ selectedOperator: '+' });
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('5');
    });

    it('updates displayValue to the difference of storedValue and displayValue', () => {
        wrapper.setState({ storedValue: '3' });
        wrapper.setState({ displayValue: '2' });
        wrapper.setState({ selectedOperator: '-' });
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('1');
    });

    it('updates displayValue to the product of storedValue and displayValue', () => {
        wrapper.setState({ storedValue: '3' });
        wrapper.setState({ displayValue: '2' });
        wrapper.setState({ selectedOperator: 'x' });
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('6');
    });
    
      it('updates displayValue to the quotient of storedValue and displayValue', () => {
        wrapper.setState({ storedValue: '3' });
        wrapper.setState({ displayValue: '2' });
        wrapper.setState({ selectedOperator: '/' });
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('1.5');
    });

    it('updates displayValue to "0" if operation results in "NaN"', () => {
        wrapper.setState({ storedValue: '3' });
        wrapper.setState({ displayValue: 'string' });
        wrapper.setState({ selectedOperator: '/' });
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('0');
    });

    it('updates displayValue to "0" if operation results in "Infinity"', () => {
        wrapper.setState({ storedValue: '7' });
        wrapper.setState({ displayValue: '0' });
        wrapper.setState({ selectedOperator: '/' });
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('0');
    });

    it('updates displayValue to "0" if selectedOperator does not match cases', () => {
        wrapper.setState({ storedValue: '7' });
        wrapper.setState({ displayValue: '10' });
        wrapper.setState({ selectedOperator: 'string' });
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('0');
    });

    it('updates displayValue to "0" if called with no value for storedValue or selectedOperator', () => {
        wrapper.setState({ storedValue: '' });
        wrapper.setState({ displayValue: '10' });
        wrapper.setState({ selectedOperator: '' });
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('0');
    });
});