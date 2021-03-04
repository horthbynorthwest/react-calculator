import React from 'react';
import { mount, shallow } from 'enzyme';
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