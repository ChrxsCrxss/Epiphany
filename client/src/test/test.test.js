import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

import Footer from '../components/Footer/Footer';

configure({adapter : new Adapter()})

describe('<Footer />', () => {
    it('should render copyright with current year', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.contains(<p> Copyright @{new Date().getFullYear()} </p>)).toEqual(true); 
    });
});