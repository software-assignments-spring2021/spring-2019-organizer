import React from 'react';
import ReactDOM from 'react-om';
import Sidebar from '../src/components/Sidebar.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sidebar/ >, div);
})