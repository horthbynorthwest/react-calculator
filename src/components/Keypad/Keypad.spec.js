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

    it('Should reder a div', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });
});