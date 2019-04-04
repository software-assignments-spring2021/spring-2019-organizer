import React from 'react';
import ReactDOM from 'react-dom';
import Events from '../components/Timeline/Events.jsx';
import Sidebar from '../components/Sidebar.js';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sidebar/ >, div);
});

//testing timeline
it('timeline renders correctly', () => {
    const testarray = {'March 23':["1", "2"], "April 2":["3"], "May 19":["4"]};
    const ele = renderer.create(<Events eventArray={testarray}/>).toJSON();
    expect(ele).toMatchSnapshot();
});