import React from 'react';
import { shallow } from 'enzyme';
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
        expect(wrapper.containsAllMatchingElements([<Display displayValue={wrapper.instance().state.displayValue} />, <Keypad />]
        )).toEqual(true)
    });
});