import React from 'react';
import ReactDOM from 'react-dom';
import Events from '../components/Timeline/Events.jsx';
import Sidebar from '../components/Sidebar.js';
import renderer from 'react-test-renderer';
import CompleteTable from '../components/CompleteTable.js';
import TimeBlock from '../components/TimeBlock.js';
import TableContent from '../components/TableContent.js';
import FixedTable from '../components/FixedTable.js';


it('renders without crashing', () => {
    const div = document.createElement('div');
    const tbody = document.createElement('tbody');
    ReactDOM.render(<Sidebar/ >, div);
});

it('timeline renders correctly', () => {
    const testarray = {'March 23':["1", "2"], "April 2":["3"], "May 19":["4"]};
    const ele = renderer.create(<Events eventArray={testarray}/>).toJSON();
    expect(ele).toMatchSnapshot();
});
