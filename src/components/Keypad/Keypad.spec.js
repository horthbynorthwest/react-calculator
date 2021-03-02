import React from 'react';
import { shallow } from 'enzyme';
import Keypad from './Keypad';

describe('Keypad', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Keypad />);
    });

    it('Should reder a div', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });
});