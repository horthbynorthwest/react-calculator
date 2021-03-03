import React from 'react';
import { shallow } from 'enzyme';
import Keypad from './Keypad';
import '../setupTests';

describe('Keypad', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <Keypad 
                callOperator={jest.fn()}
                numbers={[]}
                operators={[]}
                setOperator={jest.fn()}
                updateDisplay={jest.fn()}
            />);
    });

    it('Should render at least one div', () => {
        expect(wrapper.find('div').length).toBeGreaterThanOrEqual(1);
    });

    it('renders the values of numbers', () => {
        wrapper.setProps({numbers: ['0', '1', '2']});
        expect(wrapper.find('.numbers-container').text()).toEqual('012');
    });

    it('renders the values of operators', () => {
        wrapper.setProps({operators: ['+', '-', '*', '/']});
        expect(wrapper.find('.operators-container').text()).toEqual('+-*/');
    });
});